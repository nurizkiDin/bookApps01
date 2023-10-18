import { CButton, CInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { numberFormat } from "../../services/numberFormat";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const BookingForm = (props) => {
    const history = useHistory();
    const [text, setText] = useState("");
    const { idItem, itemName, location, itemPrice, image, unit } = props;

    const dates = new Date();
    dates.setDate(dates.getDate());
    const today = dates.toISOString().substring(0, 10);

    useEffect(() => {
        function getLabel() {
            if (unit === "Night" || unit === "Day" || unit === "Malam" || unit === "Hari") {
                setText("How long you`ll stay ? ")
            } else {
                setText(`How many ${unit}`)
            }
        }

        getLabel()
    }, [unit])

    const validate = (value) => {
        const errors = {}
        value.booked || (errors.booked = "Required")
        value.dateInput || (errors.dateInput = "Required")
        if(new Date(today) > new Date(value.dateInput)) {
            errors.dateInput = "Don`t pick past date"
        }

        return errors
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            idItem: idItem,
            itemName: itemName,
            itemPrice: itemPrice,
            booked: "",
            dateInput: today,
            unit: unit,
            location: location,
            image: image
        },
        validate,
        onSubmit: (values) => {
            startBook(values)
        }
    })

    async function startBook(values) {
        localStorage.removeItem("itemBooked");
        let ItemBooked = null;
        let newDate = null;
        const date = new Date(values.dateInput);

        if (unit === "Night" || unit === "Day" || unit === "Malam" || unit === "Hari") {
            newDate = new Date(date.setDate(date.getDate() + values.booked))
        } else {
            newDate = new Date(date)
        }

        ItemBooked = Object.assign(values, { endDate: newDate })
        localStorage.setItem("itemBooked", JSON.stringify(ItemBooked))

        history.push("/booking")
    }

    return(
        <div className="stickyForm card bordered p-3">
            <h4 className="mb-3">Start Booking</h4>
            <h5>
                {numberFormat(itemPrice)}
                <span className="font-weight-bold font-italic"> / {unit}</span>
            </h5>
            <label htmlFor="booked">{text}</label>
            <CInput
                type="number"
                id="booked"
                name="booked"
                value={formik.values.booked}
                onChange={(e) => {
                    document.getElementById("bookedFooter").value = document.getElementById("booked").value;
                    formik.handleChange(e)
                }}
            />
            {formik.errors.booked ? (<p className="text-danger">{formik.errors.booked}</p>) : ("")}
            <label htmlFor="dateInput">Pick a date</label>
            <CInput
                type="date"
                id="dateInput"
                name="dateInput"
                value={formik.values.dateInput}
                onChange={(e) => {
                    document.getElementById("dateInputFooter").value = document.getElementById("dateInput").value;
                    formik.handleChange(e)
                }}
            />
            {formik.errors.dateInput ? (<p className="text-danger">{formik.errors.dateInput}</p>) : ("")}
            <h6 className="mt-2 text-right">
                &emsp;
                You`ll pay
                &emsp;
                <span className="font-weight-bold text-info">
                    {numberFormat(itemPrice * formik.values.booked)}
                </span>
            </h6>
            <CButton
                className="mt-2"
                variant="outline"
                color="info"
                block
                onClick={formik.handleSubmit}
            >
                Continue To Book
            </CButton>
        </div>
    )
}

export default BookingForm;
