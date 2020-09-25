import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './add-new-plant.css';
import { Typography, Button } from '@material-ui/core';
import { Plant } from '../../../models/Plant';
import { addPlant } from '../../../services/plant';

interface IFormInput {
    plantName: string;
    plantStatus: string;
    plantDescription: string;
    plantResource: string;
}

export default function AddNewPlant() {
    let { register, errors, handleSubmit, reset } = useForm<IFormInput>();
    let [message, setMessage] = useState('');
    const onSubmit = (data: IFormInput) => {
        let plant: Plant = new Plant('', data.plantName, data.plantDescription, data.plantStatus, data.plantResource);
        addPlant(plant);
        setMessage(`Plant Added to Inventory!`)
        setTimeout(() => setMessage(``), 2000);
        reset(new Plant('', '', '', '', ''));

    }
    return (

        <div className="form-box">
            <div className="form-content">
                <Typography gutterBottom variant="h6" component="h4" className="form-header">Add new Plant</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-item">
                        <label>Plant Name</label>
                        <input name="plantName" ref={register({ required: true })} className="form-input" />
                        <div className="error-message">{errors.plantName && "Your input is required"}</div>
                    </div>
                    <div className="form-item">
                        <label>Description</label>
                        <input name="plantDescription" ref={register({ required: true })} className="form-input" />
                        <div className="error-message">{errors.plantDescription && "Your input is required"}</div>
                    </div>
                    <div className="form-item">
                        <label>Plant Resource</label>
                        <input name="plantResource" ref={register({ required: true })} className="form-input" />
                        <div className="error-message">{errors.plantResource && "Your input is required"}</div>

                    </div>
                    <div className="form-item">
                        <label>Status</label>
                        <select name="plantStatus" ref={register({ required: true })} className="form-select">
                            <option value="healthty">Healthy</option>
                            <option value="unhealthy">Unhealthy</option>
                            <option value="decesed">Decesed</option>
                        </select>
                        <div className="error-message">{errors.plantStatus && "Your input is required"}</div>

                    </div>
                    <div className="form-item">
                        <Button variant="contained" color="primary" className="admin-button" type="submit">
                            Submit
                        </Button>

                    </div>
                    <div>{message}</div>

                </form>
            </div>
        </div>
    )
}