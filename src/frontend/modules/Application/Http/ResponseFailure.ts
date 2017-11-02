export interface ResponseFailure {
    code: number,
    message: string,
    errors?: { [param: string]: string }
}