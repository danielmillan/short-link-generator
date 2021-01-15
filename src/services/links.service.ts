import { inject, injectable } from 'inversify';
import { IRequest } from '../models/request.model';
import { LinkModel } from '../models/sequelize/link';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeService } from './sequelize.service';

@injectable()
export class LinkService {
    constructor(@inject(SequelizeService) private readonly sequelizeService: SequelizeService) {}

    public async generateShortLink(request: IRequest): Promise<LinkModel> {
        const sequelize = this.sequelizeService.get();
        sequelize.addModels([LinkModel]);

        return LinkModel.create({
            uuid: request.uuid,
            originalLink: request.original_link,
            createdAt: new Date().toISOString(),
            shortLink: (new Date()).getTime().toString(36)
        });

    }

    public async getOriginalLink(request: IRequest): Promise<LinkModel> {
        const sequelize = this.sequelizeService.get();
        sequelize.addModels([LinkModel]);

        LinkModel.update({ clicks: Sequelize.literal('clicks + 1') }, { where: { shortLink: request.short_link } });

        return LinkModel.findOne({
            where: {
                shortLink: request.short_link
            }
        });
    }

    public async getLinks(): Promise<LinkModel> {
        const sequelize = this.sequelizeService.get();
        sequelize.addModels([LinkModel]);

        return LinkModel.findAll({
            order: [['createdAt', 'ASC']],
        });
    }

    public async deleteLink(request: IRequest): Promise<LinkModel> {
        const sequelize = this.sequelizeService.get();
        sequelize.addModels([LinkModel]);

        return LinkModel.destroy({
            where: {
                shortLink: request.short_link
            }
        });
    }
}
