import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import './formCreateBreed.css'

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'name is required';
    } else if (!/^[a-zA-Z]+$/i.test(input.name)) {
        errors.name = 'name is invalid';
    }

    if (!input.minHeight) {
        errors.minHeight = 'minimum height is required';
    } else if (input.maxHeight && input.minHeight > input.maxHeight) {
        errors.minHeight = 'minimum height must be smaller than maximum height.';
    }
    else if (input.minHeight < 0 || input.minHeight > 99) {
        errors.minHeight = 'minimum height is invalid';
    }
    if (!input.maxHeight) {
        errors.maxHeight = 'maximum height is required';
    }
    else if (input.maxHeight < 0 || input.maxHeight > 99) {
        errors.maxHeight = 'maximum height is invalid';
    }

    if (!input.minWeight) {
        errors.minWeight = 'minimum weight is required';
    } else if (input.maxWeight && input.minWeight > input.maxWeight) {
        errors.minWeight = 'minimum weight must be smaller than maximum weight.';
    }
    else if (input.minWeight < 0 || input.minWeight > 99) {
        errors.minHeight = 'minimum weight is invalid';
    }
    if (!input.maxWeight) {
        errors.maxWeight = 'maximum weight is required';
    }
    else if (input.maxWeight < 0 || input.maxWeight > 99) {
        errors.maxWeight = 'maximum weight is invalid';
    }

    if (input.endLifeSpan && input.startLifeSpan > input.endLifeSpan) {
        errors.startLifeSpan = 'start life span must be smaller than end life span.';
    }
    else if (input.startLifeSpan < 0 || input.startLifeSpan > 99) {
        errors.startLifeSpan = 'start life span is invalid';
    }
    if (input.endLifeSpan < 0 || input.endLifeSpan > 99) {
        errors.endLifeSpan = 'end life span is invalid';
    }

    if (!input.image) {
        errors.image = 'image is required';
    } else if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(input.image)) {
        errors.image = 'image is invalid';
    }

    return errors;
};

export default function FormCreateBreed() {
    const [name, setName] = useState()
    const [minHeight, setMinHeight] = useState()
    const [maxHeight, setMaxHeight] = useState()
    const [minWeight, setMinWeight] = useState()
    const [maxWeight, setMaxWeight] = useState()
    const [startLifeSpan, setStartLifeSpan] = useState()
    const [endLifeSpan, setEndLifeSpan] = useState()
    const [image, setImage] = useState()
    const temperaments = useSelector((state) => state.temperaments)
    const [selectTemperament, setSelectTemperament] = useState([]);
    const [errors, setErrors] = React.useState({});
    const [input, setInput] = React.useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        startLifeSpan: '',
        endLifeSpan: '',
        image: ''
    });

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleOnClick() {
        let breed = {
            name: input.name,
            minHeight: parseFloat(input.minHeight),
            maxHeight: parseFloat(input.maxHeight),
            minWeight: parseFloat(input.minWeight),
            maxWeight: parseFloat(input.maxWeight),
            startLifeSpan: parseInt(input.startLifeSpan),
            endLifeSpan: parseInt(input.endLifeSpan),
            image: input.image
        }
        console.log(breed);
        console.log(JSON.stringify(breed));
        fetch(`http://localhost:3001/dogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(breed)
        }).then(res => res.json()).then(res => fetch(`http://localhost:3001/dogs`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codeBreed: res.id,
                codeTemperaments: temperaments.filter(temp => selectTemperament.includes(temp.name)).map(temp => temp.id)
            })
        })).catch(err => console.log(err))
    }

    return (
        <div className='formCreateBreed'>
            <div className='labelInput'>
                <label>Name</label>
                <div className='inputGroup'>
                    <input className={errors.name && 'danger'} value={input['name']} name='name' type="text" onChange={handleInputChange} />
                    {errors.name ?
                        <p className='danger'>{errors.name}</p>
                        : <p></p>}
                </div>
            </div>
            <div className='labelInput'>
                <label>Height</label>
                <div className='inputGroup'>
                    <input className={errors.minHeight && 'danger'} value={input['minHeight']} name='minHeight' type="number" placeholder='Min' onChange={handleInputChange} />
                    {errors.minHeight ?
                        <p className='danger'>{errors.minHeight}</p>
                        : <p></p>}
                </div>
                <div className='inputGroup'>
                    <input className={errors.maxHeight && 'danger'} value={input['maxHeight']} name='maxHeight' type="number" placeholder='Max' onChange={handleInputChange} />
                    {errors.maxHeight ?
                        <p className='danger'>{errors.maxHeight}</p>
                        : <p></p>}
                </div>
            </div>
            <div className='labelInput'>
                <label>Weight</label>
                <div className='inputGroup'>
                    <input className={errors.minWeight && 'danger'} value={input['minWeight']} name='minWeight' type="number" placeholder='Min' onChange={handleInputChange} />
                    {errors.minWeight ?
                        <p className='danger'>{errors.minWeight}</p>
                        : <p></p>}
                </div>
                <div className='inputGroup'>
                    <input className={errors.maxWeight && 'danger'} value={input['maxWeight']} name='maxWeight' type="number" placeholder='Max' onChange={handleInputChange} />
                    {errors.maxWeight ?
                        <p className='danger'>{errors.maxWeight}</p>
                        : <p></p>}
                </div>
            </div>
            <div className='labelInput'>
                <label>Approximate life span</label>
                <div className='inputGroup'>
                    <input className={errors.startLifeSpan && 'danger'} value={input['startLifeSpan']} name='startLifeSpan' type="number" placeholder='Min' onChange={handleInputChange} />
                    {errors.startLifeSpan ?
                        <p className='danger'>{errors.startLifeSpan}</p>
                        : <p></p>}
                </div>
                <div className='inputGroup'>
                    <input className={errors.endLifeSpan && 'danger'} value={input['endLifeSpan']} name='endLifeSpan' type="number" placeholder='Max' onChange={handleInputChange} />
                    {errors.endLifeSpan ?
                        <p className='danger'>{errors.endLifeSpan}</p>
                        : <p></p>}
                </div>
            </div>
            <div className='labelInput'>
                <label>Image URL</label>
                <div className='inputGroup'>
                    <input className={errors.image && 'danger'} value={input['image']} name='image' type="text" onChange={handleInputChange} />
                    {errors.image ?
                        <p className='danger'>{errors.image}</p>
                        : <p></p>}
                </div>
            </div>

            <div className='select'>

                <select onChange={(e) => setSelectTemperament([...selectTemperament.slice(0), e.target.value])} value={selectTemperament.slice(-1)[0]}>
                    <option selected>Select</option>
                    {temperaments ?
                        temperaments.filter(temp => !selectTemperament.includes(temp.name)).map((temp) => <option value={temp.name}>{temp.name}</option>) :
                        <option></option>
                    }
                </select>
                <div className='selectButton'>
                    {
                        selectTemperament ?
                            selectTemperament.map(temp => <button onClick={() => setSelectTemperament(selectTemperament.filter(t => t !== temp))}>{temp}</button>) :
                            <div></div>
                    }
                </div>
            </div>
            <div className='buttonsForm'>
            <Link to='/breeds'>
                <Button text={'Go Back'} />
            </Link>
            <Button text={'Create breed'} onClick={() => handleOnClick()} />
</div>
        </div>
    )
}
