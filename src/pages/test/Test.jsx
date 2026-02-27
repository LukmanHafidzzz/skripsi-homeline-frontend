import React, { useState, useEffect } from "react";

const API_BASE = "https://skripsi-homeline-backend.vercel.app"; // Ganti dengan URL backend-mu

export default function Test() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState("idle"); // idle | uploading | saving | done | error
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [models, setModels] = useState([]);
    const [loadingList, setLoadingList] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setErrorMsg("");
        if (!selected) return setFile(null);
        if (!selected.name.toLowerCase().endsWith(".glb")) {
            setErrorMsg("Hanya file .glb yang diperbolehkan!");
            e.target.value = "";
            return setFile(null);
        }
        setFile(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!file) return setErrorMsg("Pilih file .glb terlebih dahulu.");

        setStatus("uploading");
        setUploadProgress(0);

        try {
            // ── STEP 1: Minta presigned URL dari BE ──────────────────────────────
            const presignRes = await fetch(`${API_BASE}/api/tests/presigned-url`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    fileName: `models/${Date.now()}-${file.name}`,
                    contentType: "model/gltf-binary",
                }),
            });

            const presignData = await presignRes.json();
            if (!presignRes.ok) throw new Error(presignData.message || "Gagal mendapat presigned URL");

            const { presignedUrl, fileUrl } = presignData;
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", "model/gltf-binary");

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        setUploadProgress(Math.round((event.loaded / event.total) * 100));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        resolve();
                    } else {
                        console.error("S3 error response:", xhr.responseText);
                        reject(new Error(`Upload S3 gagal (${xhr.status}). Cek console untuk detail XML error.`));
                    }
                };

                xhr.onerror = () => reject(new Error("Network error saat upload ke S3"));
                xhr.send(file);
            });
            setStatus("saving");

            const saveRes = await fetch(`${API_BASE}/api/tests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ file: fileUrl }),
            });

            const saveData = await saveRes.json();
            if (!saveRes.ok) throw new Error(saveData.message || "Gagal menyimpan ke database");

            setStatus("done");
            setSuccessMsg(`Berhasil upload! URL: ${fileUrl}`);
            setFile(null);
            e.target.reset();
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err.message || "Terjadi kesalahan.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin hapus model ini?")) return;
        try {
            const res = await fetch(`${API_BASE}/api/tests/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            setModels((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            alert("Gagal hapus: " + err.message);
        }
    };

    const isLoading = status === "uploading" || status === "saving";

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    {/* ── Header ── */}
                    <div className="mb-4">
                        <h2 className="fw-bold mb-1">Upload 3D Model (.glb)</h2>
                        <p className="text-muted mb-0">
                            File diupload langsung ke S3, lalu URL-nya disimpan ke database.
                        </p>
                        <small className="text-info fw-semibold">
                            💡 Flow ini menghindari batasan ukuran file Vercel (max 4.5MB per request).
                        </small>
                    </div>

                    {/* ── Form Card ── */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-3">Form Upload Model</h5>

                            <form onSubmit={handleSubmit}>
                                {/* File Input */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        File Model <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".glb"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        disabled={isLoading}
                                    />
                                    <div className="form-text">
                                        Hanya file <code>.glb</code> yang diterima. Maks 50MB.
                                    </div>
                                </div>

                                {/* Info file yang dipilih */}
                                {file && (
                                    <div className="alert alert-secondary py-2 px-3 mb-3">
                                        <small>
                                            <strong>File:</strong> {file.name} &nbsp;|&nbsp;
                                            <strong>Ukuran:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </small>
                                    </div>
                                )}

                                {/* Progress Bar */}
                                {status === "uploading" && (
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Mengupload ke S3... ({uploadProgress}%)
                                        </label>
                                        <div className="progress">
                                            <div
                                                className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Saving indicator */}
                                {status === "saving" && (
                                    <div className="alert alert-info py-2 mb-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="spinner-border spinner-border-sm" />
                                            <span>Menyimpan URL ke database...</span>
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {errorMsg && (
                                    <div className="alert alert-danger py-2 mb-3">{errorMsg}</div>
                                )}

                                {/* Success */}
                                {successMsg && (
                                    <div className="alert alert-success py-2 mb-3">
                                        <strong>✓ Berhasil!</strong>
                                        <br />
                                        <small className="text-break">{successMsg}</small>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isLoading || !file}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            {status === "uploading"
                                                ? `Mengupload ke S3... (${uploadProgress}%)`
                                                : "Menyimpan ke DB..."}
                                        </>
                                    ) : (
                                        "Upload Model"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Penjelasan Flow ── */}
                    <div className="card border-info mb-4">
                        <div className="card-header bg-info bg-opacity-10 fw-semibold text-info">
                            📚 Cara Kerja Upload (Belajar CORS + Vercel Workaround)
                        </div>
                        <div className="card-body">
                            <ol className="mb-0 small">
                                <li className="mb-2">
                                    <strong>FE → BE</strong> &nbsp;
                                    <code>POST /api/tests/presigned-url</code>
                                    <br />
                                    BE generate presigned URL dari S3, lalu return ke FE.
                                    <br />
                                    <em>Request ini melewati Vercel BE, tapi bodynya kecil (JSON) — aman.</em>
                                </li>
                                <li className="mb-2">
                                    <strong>FE → S3 langsung</strong> &nbsp;
                                    <code>PUT {"{presignedUrl}"}</code>
                                    <br />
                                    File diupload langsung ke S3 dari browser. BE tidak terlibat sama sekali.
                                    <br />
                                    <em>Ini kunci utama: Vercel tidak menyentuh file besar ini.</em>
                                </li>
                                <li className="mb-0">
                                    <strong>FE → BE</strong> &nbsp;
                                    <code>POST /api/tests</code>
                                    <br />
                                    FE kirim <code>{"{ file: fileUrl }"}</code> (string URL). BE simpan ke DB.
                                    <br />
                                    <em>Request ini kecil (hanya string URL) — aman melewati Vercel.</em>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}