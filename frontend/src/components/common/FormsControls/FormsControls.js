import React from "react"
import s from './FormsControls.module.css'

const FormControl = ({ formik, name, children, ...props }) => {
  const hasError = formik.errors[name]
  return (
    <div className={s.formControl + (hasError ? " " + s.error : "")}>
      <div>
        {children}
      </div>
      {hasError &&
        <div>
          <span>{formik.errors[name]}</span>
        </div>
      }
    </div>
  )
}

export const Textarea = (props) => {
  const { formik, name, ...restProps } = props
  return <FormControl {...props}>
      <textarea value={formik.values[name]} onChange={formik.handleChange} id={name} name={name} {...restProps} />
    </FormControl>
}

export const Input = (props) => {
  const { formik, name, label, ...restProps } = props
  return <FormControl {...props}>
        <input value={formik.values[name]} onChange={formik.handleChange} id={name} name={name} {...restProps} />
        {label && <label htmlFor={name}>{label}</label>}
    </FormControl>
}