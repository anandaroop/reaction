import { Flex } from "@artsy/palette"
import {
  Error,
  Footer,
  ForgotPassword,
  FormContainer as Form,
  SubmitButton,
} from "Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { LoginValidator } from "Components/Authentication/Validators"
import PasswordInput from "Components/PasswordInput"
import QuickInput from "Components/QuickInput"
import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import { recaptcha } from "Utils/recaptcha"

export interface LoginFormState {
  error: string
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  state = {
    error: this.props.error,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.onSubmit}
        validationSchema={LoginValidator}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
        }: FormikProps<InputValues>) => {
          const globalError =
            this.state.error || (status && !status.success && status.error)

          const isMissingTwoFactorCode =
            globalError === "missing two-factor authentication code"

          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} data-test="LoginForm">
              <QuickInput
                block
                error={touched.email && errors.email}
                placeholder="Enter your email address"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
              <PasswordInput
                block
                error={touched.password && errors.password}
                placeholder="Enter your password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {(isMissingTwoFactorCode || true) && ( // TODO: remove true
                <QuickInput
                  block
                  error={touched.otp_attempt && errors.otp_attempt}
                  placeholder="Enter the 6-digit code"
                  name="otp_attempt"
                  label="Authenticator code"
                  type="otp_attempt"
                  value={values.otp_attempt}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
              <Flex alignItems="center" justifyContent="flex-end">
                <ForgotPassword
                  onClick={() => this.props.handleTypeChange(ModalType.forgot)}
                />
              </Flex>
              <SubmitButton loading={isSubmitting}>Log in</SubmitButton>
              {globalError && !isMissingTwoFactorCode && (
                <Error show>{globalError}</Error>
              )}
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.signup)
                }
                mode={"login" as ModalType}
                onAppleLogin={this.props.onAppleLogin}
                onFacebookLogin={this.props.onFacebookLogin}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
