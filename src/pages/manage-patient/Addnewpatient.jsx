import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Card from "@/components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "react-select";
import Fileinput from "@/components/ui/Fileinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



const FormValidationSchema = yup
  .object({
    fullname: yup.string().required("FullName is Required"),
    password: yup.string().required("Password is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();

const AddNewPatient = () => {
  const [selectedFiles2, setSelectedFiles2] = useState([]);

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      patientName: "",
      patientAge: "",
      branchID: "",
      patientGender: "",
      patientReferringDoctor: "",
      bloodGroup: "",
      address: "",
      phoneNumber: "",
      patientUploadedDoc: {},
      status: true,
    },
    FormValidationSchema: FormValidationSchema,
    onSubmit: async (values) => {
      try {
        // Make a POST request to your backend API to add the patient
        const response = await axios.post("your-api-endpoint-here", values);

        // Handle success
        console.log("Patient added successfully:", response.data);

        // Clear form fields after successful submission (if needed)
        formik.resetForm();
      } catch (error) {
        // Handle error
        console.error("Error adding patient:", error);
      }
    },
  });

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles2(filesArray);
  };

  return (
    <div>
      <Card title="Add New Patient">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:grid-cols-2 grid gap-5 grid-cols-1">
          <InputGroup
            label="Full name"
            id="patientName"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors.fullname}
          />
          <InputGroup
            label="Branch Id"
            id="branchID"
            type="number"
            placeholder="Branch Id"
          />
          <InputGroup
            label="Patient Age"
            id="patientAge"
            type="number"
            placeholder="Patient Age"
          />
          <div >
            <label htmlFor=" hh2" className="form-label ">
              Gender
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              options={genders}
              value={genders.find((option) => option.value === formik.values.patientGender)}
              onChange={(option) => formik.setFieldValue("patientGender", option.value)}
              onBlur={formik.handleBlur}
              isClearable
              placeholder="Select Gender"
              id="patientGender"
              name="patientGender"
            />
          </div>
          <InputGroup
            label="Referring Doctor"
            id="patientReferringDoctor"
            type="text"
            placeholder="Referring Doctor"

          />
          <InputGroup
            label="Blood Group"
            id="bloodGroup"
            type="text"
            placeholder="Blood Group"

          />
          <InputGroup
            label="Address"
            id="address"
            type="text"
            placeholder="Address"

          />
          <InputGroup
            label="Phone Number"
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"

          />
          <div>
            <label htmlFor="patientUploadedDoc" className="form-label">
              File Upload
            </label>
            <Fileinput
              name="patientUploadedDoc"
              selectedFiles={selectedFiles2}
              onChange={handleFileChangeMultiple2}
              multiple
              preview
            />
          </div>
          <div className="lg:col-span-2 col-span-1">
            <div className="ltr:text-right rtl:text-left">
              <Button type="submit btn " className="bg-sky-900 text-white">Submit</Button>
              <Button type="button" className="ms-1  btn btn-danger" onClick={formik.resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddNewPatient;
