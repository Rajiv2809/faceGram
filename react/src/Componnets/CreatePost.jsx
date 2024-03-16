import React, { useState } from 'react';
import { useStateContext } from '../Contexts/Context';
import axiosClient from './../Axios';

export default function CreatePost() {
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([]);
    const { showToast } = useStateContext();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });
        axiosClient.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(({ data }) => {
            showToast(data.message);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea value={caption} onChange={e => setCaption(e.target.value)} className="form-control" name="caption" id="caption" cols="30" rows="3"></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input type="file" onChange={handleImageChange} className="form-control" id="attachments" name="attachments" multiple />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Share
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
