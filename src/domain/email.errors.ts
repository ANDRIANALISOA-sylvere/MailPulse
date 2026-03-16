import { DomainException } from '../shared/exceptions/domain.exception';

export class EmailNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Email with id ${id} is not found`);
  }
}
