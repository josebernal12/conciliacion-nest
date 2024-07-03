import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: false })
class IsObjectIdConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        return Types.ObjectId.isValid(value); // Check if the value is a valid ObjectId
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid ObjectId'; // Default error message
    }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsObjectIdConstraint,
        });
    };
}
