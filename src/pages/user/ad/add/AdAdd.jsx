import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import './style.css'
import { useNavigate } from 'react-router-dom'

export default function AdAdd() {
    const navigate = useNavigate();

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
                const response = await axios.get('https://skripsi-homeline-backend.vercel.app/api/user/certificate-types');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFacilities = formData.facilities.filter(f =>
            (f.facility_id === 1 || f.facility_id === 2) && (!f.quantity || f.quantity <= 0)
        );

        if (requiredFacilities.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Tidak Lengkap',
                text: 'Kamar Mandi dan Kamar Tidur wajib diisi',
                confirmButtonColor: '#f39c12'
            });
            return;
        }

        const data = new FormData();

        Object.entries(formData).forEach(([key, val]) => {
            if (key !== 'facilities') {
                data.append(key, val);
            }
        });

        data.append('province', getNameById(provinsiList, selectedProvinsi));
        data.append('city', getNameById(kotaList, selectedKota));
        data.append('subdistrict', getNameById(kecamatanList, selectedKecamatan));
        data.append('village', getNameById(kelurahanList, selectedKelurahan));
        data.append('certificate_type_id', selectedType);

        const validFacilities = formData.facilities.filter(f => f.quantity && f.quantity > 0);
        data.append('facilities', JSON.stringify(validFacilities));

        for (const file of photos) {
            data.append('photos', file);
        }
        if (certificate) {
            data.append('certificate', certificate);
        }

        try {
            const response = await axios.post('https://skripsi-homeline-backend.vercel.app/api/user/advertisement/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Rumah berhasil ditambahkan',
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                navigate('/advertisement/waiting');
            });

        } catch (err) {
            console.error('Full error:', err);
            console.error('Error response:', err.response?.data);

            let errorTitle = 'Gagal Menyimpan';
            let errorMessage = 'Terjadi kesalahan saat menyimpan data rumah';

            if (err.response?.status === 500) {
                errorTitle = 'Error Server';
                errorMessage = 'Terjadi kesalahan server. Silakan coba lagi dalam beberapa saat.';
            } else if (err.response?.status === 401) {
                errorTitle = 'Akses Ditolak';
                errorMessage = 'Anda tidak memiliki akses. Silakan login terlebih dahulu.';
            } else if (err.response?.status === 400) {
                errorTitle = 'Data Tidak Valid';
                errorMessage = 'Silakan periksa kembali data yang diinputkan.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }

            Swal.fire({
                icon: 'error',
                title: errorTitle,
                text: errorMessage,
                confirmButtonColor: '#dc3545',
                footer: err.response?.status ? `Error Code: ${err.response.status}` : null
            });
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
                    <div className='mb-3'>
                        Note: tanda (<span className='text-danger'>*</span>) wajib diisi
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button type='submit' variant="primary" className='btn-input fw-semibold'>
                            Input
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
