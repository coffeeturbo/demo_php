export interface ChangePasswordRequest {
    old_password: string;
    password: string;
    password_confirm: string;
}