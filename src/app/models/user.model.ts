export class User {
  constructor(
    public id: number,
    public email: string,
    public first_name: string,
    public last_name: string,
    public phone: string,
    public password_digest: string,
    public invitation_accepted: boolean,
    public invitation_token: string,
    public invitation_expiration: Date,
    public created_at: Date,
    public updated_at: Date,
    public token?: any,
  ) {}
}
