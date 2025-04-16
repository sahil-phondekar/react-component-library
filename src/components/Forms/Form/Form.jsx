import React from "react";
import PropTypes from "prop-types";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = ({
  children,
  onSubmit,
  validationSchema,
  className = "",
  formOptions = {},
  id,
}) => {
  const isZodSchema = validationSchema && validationSchema._def;

  const methods = useForm({
    ...(isZodSchema
      ? { resolver: zodResolver(validationSchema) }
      : {
          resolver: async (data) => {
            const errors = {};

            if (validationSchema) {
              Object.entries(validationSchema).forEach(([key, rules]) => {
                const value = data[key];

                if (rules?.required?.value && !value) {
                  errors[key] = { message: rules.required.message };
                  return;
                }

                if (rules?.minLength && value?.length < rules.minLength.value) {
                  errors[key] = { message: rules.minLength.message };
                  return;
                }

                if (rules?.maxLength && value?.length > rules.maxLength.value) {
                  errors[key] = { message: rules.maxLength.message };
                  return;
                }

                if (
                  rules?.pattern &&
                  value &&
                  !rules.pattern.value.test(value)
                ) {
                  errors[key] = { message: rules.pattern.message };
                  return;
                }

                if (typeof rules?.validate === "function") {
                  const validationResult = rules.validate(value);
                  if (typeof validationResult === "string") {
                    errors[key] = { message: validationResult };
                  } else if (validationResult === false) {
                    errors[key] = { message: `Validation failed for ${key}` };
                  }
                }
              });
            }

            return { values: data, errors };
          },
        }),
    ...formOptions,
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.propTypes = {
  /** Form content (inputs, buttons, etc.) */
  children: PropTypes.node.isRequired,
  /** Submit handler function */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Validation schema (either object with rules or Zod schema)
   * Example manual schema:
   * {
   *   email: {
   *     required: { value: true, message: "Required" },
   *     pattern: { value: /@/, message: "Need @" }
   *   }
   * }
   */
  validationSchema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      _def: PropTypes.object,
    }),
  ]),
  /** CSS class name for the form element */
  className: PropTypes.string,
  /** Additional react-hook-form options */
  formOptions: PropTypes.object,
  /** HTML id attribute for the form */
  id: PropTypes.string,
};

Form.defaultProps = {
  className: "",
  formOptions: {},
};

export default Form;
