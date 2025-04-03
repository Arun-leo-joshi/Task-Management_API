import { body, validationResult } from 'express-validator';

export const ValidateTask = [
    body('title').isString().isLength({ max: 100 }).notEmpty()
        .withMessage('Title is required and should be a string with a maximum length of 100 characters.'),

    body('description').isString().optional(),

    body('status')
        .optional()
        .customSanitizer((value) => value || "TODO")
        .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
        .withMessage('Status should be one of TODO, IN_PROGRESS, or COMPLETED.'),

    body('priority').isIn(['LOW', 'MEDIUM', 'HIGH']).notEmpty()
        .withMessage('Priority is required and should be one of LOW, MEDIUM, or HIGH.'),

    body('dueDate').optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: "validation failed", errors: errors.array() });
        }
        next();
    },
];