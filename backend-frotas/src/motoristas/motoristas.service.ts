import { Injectable } from '@nestjs/common';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { Motorista } from './models/motorista.model';

@Injectable()
export class MotoristasService {
  private motoristas: Motorista[] = [];

  findAll() {
    return this.motoristas;
  }

  findOne(id: number) {
    return this.motoristas.find((m) => m.id === id);
  }

  create(data: CreateMotoristaDto) {
    const id = this.motoristas.length + 1;
    const novoMotorista = { id, ...data };
    this.motoristas.push(novoMotorista);
    return novoMotorista;
  }

  update(id: number, data: Partial<CreateMotoristaDto>) {
    const index = this.motoristas.findIndex((m) => m.id === id);
    if (index === -1) return null;

    this.motoristas[index] = { ...this.motoristas[index], ...data };
    return this.motoristas[index];
  }

  remove(id: number) {
    const index = this.motoristas.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const motoristaRemovido = this.motoristas[index];
    this.motoristas.splice(index, 1);
    return motoristaRemovido;
  }
}
