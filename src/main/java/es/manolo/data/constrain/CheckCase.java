package es.manolo.data.constrain;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import es.manolo.data.constrain.CheckCase.CheckCaseValidator;

@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER,
        ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CheckCaseValidator.class)
@Documented
public @interface CheckCase {

    public enum CaseMode {
        UPPER, LOWER;
    }

    public static class CheckCaseValidator
            implements ConstraintValidator<CheckCase, String> {

        private CaseMode caseMode;

        @Override
        public void initialize(CheckCase constraintAnnotation) {
            this.caseMode = constraintAnnotation.value();
        }

        @Override
        public boolean isValid(String val, ConstraintValidatorContext ctx) {
            if (val == null) {
                return true;
            }
            return val.equals(caseMode == CaseMode.UPPER ? val.toUpperCase()
                    : val.toLowerCase());
        }
    }

    String message() default "only uppercase is allowed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    CaseMode value() default CaseMode.UPPER;

    @Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER,
            ElementType.ANNOTATION_TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        CheckCase[] value();
    }
}