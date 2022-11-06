import { BooleanSchema, NumberSchema, StringSchema } from "joi";

type TS<K extends boolean, SimpleType, JoiType> = K extends true ? SimpleType : JoiType;

interface BaseUser<K extends boolean = true> {
    readonly id: TS<K, string, StringSchema>;
    readonly login: TS<K, string, StringSchema>;
    readonly password: TS<K, string, StringSchema>;
    readonly age: TS<K, number, NumberSchema>;
    readonly isDeleted: TS<K, boolean, BooleanSchema>;
}

export type User = BaseUser;
export type JoiUserSchema = BaseUser<false>;
