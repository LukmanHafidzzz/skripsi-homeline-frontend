import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import './style.css'
import { useNavigate } from 'react-router-dom'

export default function AdAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [use3D, setUse3D] = useState(false);

    const [provinsiList, setProvinsiList] = useState([]);
    const [kotaList, setKotaList] = useState([]);
    const [kecamatanList, setKecamatanList] = useState([]);
    const [kelurahanList, setKelurahanList] = useState([]);

    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [selectedKota, setSelectedKota] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedKelurahan, setSelectedKelurahan] = useState('');

    const [certificateTypes, setCertificateTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');


    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(res => res.json())
            .then(data => setProvinsiList(data));
    }, []);

    useEffect(() => {
        if (selectedProvinsi) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`)
                .then(res => res.json())
                .then(data => setKotaList(data));
        } else {
            setKotaList([]);
            setKecamatanList([]);
            setKelurahanList([]);
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        if (selectedKota) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKota}.json`)
                .then(res => res.json())
                .then(data => setKecamatanList(data));
        } else {
            setKecamatanList([]);
            setKelurahanList([]);
        }
    }, [selectedKota]);

    useEffect(() => {
        if (selectedKecamatan) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`)
                .then(res => res.json())
                .then(data => setKelurahanList(data));
        } else {
            setKelurahanList([]);
        }
    }, [selectedKecamatan]);

    useEffect(() => {
        const fetchCertificateTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5773/api/user/certificate-types');
                setCertificateTypes(response.data);
            } catch (error) {
                console.error('Error fetching certificate types:', error);
            }
        };

        fetchCertificateTypes();
    }, []);

    const [formData, setFormData] = useState({
        title: '', building_area: '', land_area: '', price: '', no_telp: '', description: '',
        link_maps: '', full_address: '', facilities: [],
    });
    const [photos, setPhotos] = useState([]);
    const [certificate, setCertificate] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFacilityChange = (id, qty) => {
        const quantity = parseInt(qty) || 0;
        setFormData(prev => {
            const updated = prev.facilities.filter(f => f.facility_id !== id);
            if (quantity > 0) {
                return { ...prev, facilities: [...updated, { facility_id: id, quantity: quantity }] };
            }
            return { ...prev, facilities: updated };
        });
    };

    const getNameById = (array, id) => {
        const item = array.find(item => item.id === id);
        return item ? item.name : '';
    };

    const uploadFileToS3 = async (file, folder) => {
        const presignRes = await axios.post(
            "http://localhost:5773/api/user/advertisement/presigned-url",
            {
                fileName: file.name,
                contentType: file.type,
                folder: folder
            },
            { withCredentials: true }
        );
        const { presignedUrl, fileUrl } = presignRes.data;
        await fetch(presignedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });
        return fileUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ===============================
            // VALIDASI FASILITAS WAJIB
            // ===============================
            const requiredFacilities = formData.facilities.filter(f =>
                (f.facility_id === 1 || f.facility_id === 2) &&
                (!f.quantity || f.quantity <= 0)
            );

            if (requiredFacilities.length > 0) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Data Tidak Lengkap',
                    text: 'Kamar Mandi dan Kamar Tidur wajib diisi',
                    confirmButtonColor: '#f39c12'
                });
                setLoading(false);
                return;
            }

            // ===============================
            // KONFIRMASI 3D
            // ===============================
            if (use3D) {
                const result = await Swal.fire({
                    title: 'Gunakan fitur 3D modeling?',
                    html: `<small><i>*Biaya Rp 150.000 dengan metode QRIS</i></small>`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                });

                if (!result.isConfirmed) {
                    setLoading(false);
                    return;
                }
            }

            // ===============================
            // UPLOAD FOTO (PARALEL 🚀)
            // ===============================
            let uploadedPhotoUrls = [];

            if (photos.length > 0) {
                uploadedPhotoUrls = await Promise.all(
                    photos.map(file => uploadFileToS3(file, "photos"))
                );
            }

            // ===============================
            // UPLOAD SERTIFIKAT
            // ===============================
            let uploadedCertificateUrl = null;

            if (certificate) {
                uploadedCertificateUrl = await uploadFileToS3(
                    certificate,
                    "certificates"
                );
            }

            // ===============================
            // SIAPKAN PAYLOAD JSON
            // ===============================
            const validFacilities = formData.facilities
                .filter(f => f.quantity && f.quantity > 0);

            const payload = {
                ...formData,
                province: getNameById(provinsiList, selectedProvinsi),
                city: getNameById(kotaList, selectedKota),
                subdistrict: getNameById(kecamatanList, selectedKecamatan),
                village: getNameById(kelurahanList, selectedKelurahan),
                certificate_type_id: selectedType,
                use_3d: use3D ? 'yes' : 'no',
                facilities: JSON.stringify(validFacilities),
                photos: uploadedPhotoUrls,
                certificate_url: uploadedCertificateUrl
            };

            // ===============================
            // KIRIM KE BACKEND
            // ===============================
            await axios.post(
                'http://localhost:5773/api/user/advertisement/add',
                payload,
                {
                    withCredentials: true,
                    timeout: 60000,
                }
            );

            // ===============================
            // SUCCESS
            // ===============================
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Rumah berhasil ditambahkan',
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });

            navigate('/advertisement/waiting');

        } catch (err) {
            console.error('Error detail:', err);

            let errorTitle = 'Gagal Menyimpan';
            let errorMessage = 'Terjadi kesalahan saat menyimpan data rumah';

            if (err.message === 'Network Error' || !err.response) {
                errorTitle = 'Masalah Koneksi';
                errorMessage = 'Tidak dapat terhubung ke server.';
            } else if (err.response?.status === 403) {
                errorTitle = 'Akses Ditolak';
                errorMessage = 'Server menolak permintaan.';
            } else if (err.response?.status === 500) {
                errorTitle = 'Error Server';
                errorMessage = 'Terjadi kesalahan server.';
            } else if (err.response?.status === 401) {
                errorTitle = 'Belum Login';
                errorMessage = 'Silakan login terlebih dahulu.';
            } else if (err.response?.status === 400) {
                errorTitle = 'Data Tidak Valid';
                errorMessage = err.response.data.message;
            }

            await Swal.fire({
                icon: 'error',
                title: errorTitle,
                text: errorMessage,
                confirmButtonColor: '#dc3545'
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container className=''>
                <Form onSubmit={handleSubmit}>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Judul Iklan <span className='text-danger'>*</span></Form.Label>
                                <Form.Control name='title' value={formData.title} onChange={handleChange} className='form-add' type="text" placeholder="Masukkan judul iklan" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Luas Bangunan <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <Form.Control name='building_area' value={formData.building_area} onChange={handleChange} type='number' placeholder="Masukkan luas bangunan" aria-label="" aria-describedby="basic-addon1" className="form-add-group-wide" required />
                                <InputGroup.Text className='input-group-text-wide' id="">m<sup>2</sup></InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Luas Tanah <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <Form.Control name='land_area' value={formData.land_area} onChange={handleChange} type='number' placeholder="Masukkan luas tanah" aria-label="" aria-describedby="basic-addon1" className="form-add-group-wide" required />
                                <InputGroup.Text className='input-group-text-wide' id="">m<sup>2</sup></InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Harga <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rp</InputGroup.Text>
                                <Form.Control name='price' value={formData.price} onChange={handleChange} placeholder="Masukkan harga" aria-label="" aria-describedby="basic-addon1" className="form-add-group" required />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Nomor Whatsapp <span className='text-danger'>*</span></Form.Label>
                            <InputGroup className="">
                                <InputGroup.Text id="">+62</InputGroup.Text>
                                <Form.Control name='no_telp' value={formData.no_telp} onChange={handleChange} placeholder="Contoh: 8xxxxxxxxxxx" aria-label="" aria-describedby="basic-addon1" className="form-add-group" required />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='fw-semibold mb-2'>Deskripsi <span className='text-danger'>*</span></Form.Label>
                                <Form.Control name='description' value={formData.description} onChange={handleChange} className='form-add-textarea' as="textarea" rows={3} placeholder='Masukkan deskripsi' required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4 row-cols-3 g-4'>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Provinsi <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add' value={selectedProvinsi} onChange={e => setSelectedProvinsi(e.target.value)} required>
                                <option value="">Pilih Provinsi</option>
                                {provinsiList.map((prov) => (
                                    <option key={prov.id} value={prov.id}>{prov.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kota/Kabupaten <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add' value={selectedKota} onChange={e => setSelectedKota(e.target.value)} disabled={!kotaList.length} required>
                                <option value="">Pilih Kota</option>
                                {kotaList.map((kota) => (
                                    <option key={kota.id} value={kota.id}>{kota.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kecamatan <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add' value={selectedKecamatan} onChange={e => setSelectedKecamatan(e.target.value)} disabled={!kecamatanList.length} required>
                                <option value="">Pilih Kecamatan</option>
                                {kecamatanList.map((kec) => (
                                    <option key={kec.id} value={kec.id}>{kec.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Kelurahan <span className='text-danger'>*</span></Form.Label>
                            <Form.Select className='form-add' value={selectedKelurahan} onChange={e => setSelectedKelurahan(e.target.value)} disabled={!kelurahanList.length} required>
                                <option value="">Pilih Kelurahan</option>
                                {kelurahanList.map((kel) => (
                                    <option key={kel.id} value={kel.id}>{kel.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Link maps <span className='text-danger'>*</span></Form.Label>
                                <Form.Control name='link_maps' value={formData.link_maps} onChange={handleChange} className='form-add' type="text" placeholder="Masukkan link maps" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Alamat Lengkap <span className='text-danger'>*</span></Form.Label>
                                <Form.Control name='full_address' value={formData.full_address} onChange={handleChange} className='form-add' type="text" placeholder="Masukkan alamat provinsi dan seterusnya" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Foto Rumah <span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="file"
                                    accept='image/*'
                                    multiple
                                    required
                                    onChange={(e) => setPhotos([...e.target.files])}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Sertifikat Hak Atas Tanah (PDF) <span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="file"
                                    accept='application/pdf'
                                    required
                                    onChange={(e) => setCertificate(e.target.files[0])}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label className='fw-semibold mb-2'>Jenis Sertifikat <span className='text-danger'>*</span></Form.Label>
                            <Form.Select
                                className='form-add'
                                value={selectedType}
                                onChange={e => setSelectedType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Pilih Jenis Sertifikat</option>
                                {certificateTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <div className="fs-5 fw-bold text-center mb-3">
                        Fasilitas
                    </div>
                    <Row className="row-cols-3 g-4 mb-5">
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Kamar Mandi <span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    required
                                    onChange={(e) => handleFacilityChange(1, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Kamar Tidur <span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    required
                                    onChange={(e) => handleFacilityChange(2, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Garasi</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(3, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Keluarga</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(4, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Tamu</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(5, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Dapur</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(6, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Gudang</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(7, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label className='fw-semibold mb-2'>Ruang Makan</Form.Label>
                                <Form.Control
                                    className='form-add'
                                    type="number"
                                    placeholder="Masukkan jumlah"
                                    onChange={(e) => handleFacilityChange(8, e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-start'>
                        <div className="mb-4 p-3 border rounded">
                            <Form.Check
                                type="checkbox"
                                label={
                                    <>
                                        Gunakan fitur <b>3D Modeling</b>
                                        <span className="text-success ms-2">(Rp 150.000)</span>
                                    </>
                                }
                                checked={use3D}
                                onChange={(e) => setUse3D(e.target.checked)}
                            />
                            <small className="text-muted">
                                Pembayaran dilakukan menggunakan QRIS setelah iklan diajukan.
                            </small>
                        </div>
                    </div>
                    <div className='mb-3'>
                        Note: tanda (<span className='text-danger'>*</span>) wajib diisi
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button type='submit' variant="primary" className='btn-input fw-semibold' disabled={loading}>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Input'
                            )}
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
