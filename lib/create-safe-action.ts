import {z} from "zod"

// creating generrics that would work based on any input will send to it based on the output we excpect the input will recived
// for example sucess like data which be prsisma board or error or feilrd error 
export type FieldErrors<T> = {
    [K in keyof T]? : string[];

};

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?:string | null;
    data?:TOutput

}

export const createSafeAction = <TInput, TOutput> (
    schema: z.Schema<TInput>,
    handler: (validationData: TInput) => Promise<ActionState<TInput, TOutput>>) => {
        return async (data: TInput) : Promise<ActionState<TInput, TOutput>> => {
            const validationResult = schema.safeParse(data)
            if(!validationResult.success) {
                return {
                    fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
                };
            }
            return handler(validationResult.data)

        }
    }


