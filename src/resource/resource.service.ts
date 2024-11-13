import { Injectable } from '@nestjs/common';
import { config } from 'src/config';

import { IResponse } from 'src/shared';

const { HOST, SERVER_PORT } = config;

@Injectable()
export class ResourceService {
  constructor() {}

  getMapInfo(id: string): IResponse {
    const image = `http://${HOST}:${SERVER_PORT}/assets/map.jpeg`;
    return {
      is_success: true,
      data: {
        id: id,
        name: 'test office',
        image: image,
        resources: [
          { id: 1, name: 'name', status: 1, x: 1, y: 1, height: 12, width: 12 },
        ],
      },
      errors: [],
    };
  }
}
