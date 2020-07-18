import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from 'axios';


const formSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    size: yup.string().required("Please select a size"),
    pepperoni: yup.string().defined(),
    sausage: yup.string().defined(),
    ham: yup.string().defined(),
    olives: yup.string().defined(),
    bellpepper: yup.string().defined(),
    specInstructions: yup.string().notRequired()
});


export default function Pizza() {
    const initialFormState = {
        name: "",
        size: "",
        pepperoni: "",
        ham: "",
        sausage: "",
        olives: "",
        bellpepper: "",
        specInstructions: "",
    };

    const [serverError, setServerError] = useState("");
    const [post, setPost] = useState("");
    const [formState, setFormState] = useState(initialFormState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        ham: "",
        sausage: "",
        olives: "",
        bellpepper: "",
        specInstructions: "",
    });


    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name)
            .then(valid => {
                setErrors({
                    ...errors, [e.target.name]: ""
                })
            })
            .catch(errors => {
                setErrors({
                    ...errors, [e.target.name]: errors.errors[0]
                });
            });
    };


    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log('valid?', valid);
            setIsButtonDisabled(!valid);
        });
    }, [formState]);


    const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted');
        alert("Your order has been received. Your pizza is on its way");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                console.log("Success", post);
                console.log(response.data.size)
                setFormState({
                    name: "",
                    size: "",
                    sausage: "",
                    pepperoni: "",
                    ham: "",
                    olives: "",
                    bellpepper: "",
                    specInstructions: "",
                });
                serverError(null);
            })
            .catch(error => {
                setServerError("404 error");
            });
    };


    const inputChange = e => {
        e.persist();


        const newFormData = {
            ...formState, [e.target.name]: e.target.type === "checkbox" ?
                e.target.checked : e.target.value
        };


        validateChange(e);
        setFormState(newFormData);
        console.log(e.target.name.howmany)
    };

    return (
        <form
            onSubmit={formSubmit}>
            <label htmlFor="name"> Your Name:
		            <input
                    type="text"
                    name="name"
                    id="nameinput"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 2 ? <p className="error">{errors.name}</p> : null}
                <br />
            </label>
            <br />


            <label htmlFor='size'>Select Pizza Size:
		            <select name='size' id='size' onChange={inputChange}>
                    <option name='default' value={null}></option>
                    <option name='Sm' value='small'>Small</option>
                    <option name='Med' value='medium'>Medium</option>
                    <option name='Lg' value='large'>Large</option>
                    <option name="Xl" value='extraLarge'>Extra Large</option>
                </select>
            </label>


            <div className='toppingChecklist'>
                <p>Choose Your Topping(s)</p>


                <label htmlFor='pepperoni'>
                    <input
                        type='checkbox'
                        name='pepperoni'
                        id="pepperoniSelect"
                        checked={formState.pepperoni}
                        onChange={inputChange}
                    />
		                    Pepperoni
		                </label>
                <br />


                <label htmlFor='sausage'>
                    <input
                        type='checkbox'
                        name='sausage'
                        id="sausageSelect"
                        checked={formState.sausage}
                        onChange={inputChange}
                    />
		                    Sausage
		                </label>
                <br />

                <label htmlFor='ham'>
                    <input
                        type='checkbox'
                        name='ham'
                        id="hamSelect"
                        checked={formState.ham}
                        onChange={inputChange}
                    />
		                    Ham
		                </label>
                <br />




                <label htmlFor='olives'>
                    <input
                        type='checkbox'
                        name='olives'
                        id="olivesSelect"
                        checked={formState.olives}
                        onChange={inputChange}
                    />
		                    Olives
		                </label>
                <br />


                <label htmlFor='bellpepper'>
                    <input
                        type='checkbox'
                        name='bellpepper'
                        id="bellpepperSelect"
                        checked={formState.bellpepper}
                        onChange={inputChange}
                    />
		                    Bell Pepper
		                </label>
                <br />


                <br />
            </div>
            <br />


            <label htmlFor='Special Instructions'>
                Special Instructions
		                <br />
                <textarea
                    name='specInstructions'
                    id='specInstructionsData'
                    placeholder='Extra cheese, toppings, etc.'
                    value={formState.specInstructions}
                    onChange={inputChange}
                />
            </label>
            <br />
            <button name='placeOrder' onSubmit={post} disabled={isButtonDisabled}>Place Order</button>
        </form>
    )
}
