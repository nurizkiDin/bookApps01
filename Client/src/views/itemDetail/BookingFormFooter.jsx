import { CButton, CInput, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { numberFormat } from "../../services/numberFormat";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const BookingFormFooter = (props) => {
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
        value.bookedFooter || (errors.bookedFooter = "Required")
        value.dateInputFooter || (errors.dateInputFooter = "Required")
        if(new Date(today) > new Date(value.dateInputFooter)) {
            errors.dateInputFooter = "Don`t pick past date"
        }

        return errors
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            idItem: idItem,
            itemName: itemName,
            itemPrice: itemPrice,
            bookedFooter: "",
            dateInputFooter: today,
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
        const date = new Date(values.dateInputFooter);

        if (unit === "Night" || unit === "Day" || unit === "Malam" || unit === "Hari") {
            newDate = new Date(date.setDate(date.getDate() + values.bookedFooter))
        } else {
            newDate = new Date(date)
        }

        ItemBooked = Object.assign(values, { endDate: newDate })
        localStorage.setItem("itemBooked", JSON.stringify(ItemBooked))

        history.push("/booking")
    }

    return(
        <div className="fixed-bottom card p-3">
            <h6>
                {numberFormat(itemPrice)}
                <span className="font-weight-bold font-italic"> / {unit}</span>
            </h6>
            <CRow>
                <CInput
                    className="col-6 col"
                    type="number"
                    id="bookedFooter"
                    name="bookedFooter"
                    value={formik.values.bookedFooter}
                    placeholder={text}
                    onChange={(e) => {
                        document.getElementById("booked").value = document.getElementById("bookedFooter").value;
                        formik.handleChange(e)
                    }}
                />
                {formik.errors.bookedFooter ? (<p className="text-danger">{formik.errors.bookedFooter}</p>) : ("")}
                <CInput
                    className="col-6 col"
                    type="date"
                    id="dateInputFooter"
                    name="dateInputFooter"
                    value={formik.values.dateInputFooter}
                    placeholder="Pick a date"
                    onChange={(e) => {
                        document.getElementById("dateInput").value = document.getElementById("dateInputFooter").value;
                        formik.handleChange(e)
                    }}
                />
                {formik.errors.dateInputFooter ? (<p className="text-danger">{formik.errors.dateInputFooter}</p>) : ("")}
            </CRow>
            <h6 className="text-right">
                &emsp;
                You`ll pay
                &emsp;
                <span className="font-weight-bold text-info">
                    {numberFormat(itemPrice * formik.values.bookedFooter)}
                </span>
            </h6>
            <CButton
                variant="outline"
                color="info"
                onClick={formik.handleSubmit}
            >
                Continue To Book
            </CButton>
        </div>
    )
}

export default BookingFormFooter;
