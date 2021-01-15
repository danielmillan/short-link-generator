import debugLib from 'debug';
import { request, Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LinkService } from '../services/links.service';
import { SequelizeService } from '../services/sequelize.service';
import { IRequest } from '../models/request.model';

const linksController = Router();
const debug = debugLib('link:LinksController');

linksController.post('/V1/Utilities/Shortlink', async (req: Request, res: Response) => {
    const params: IRequest = {
        uuid: uuidv4(),
        original_link: req.body.link
    };
    let response: any;
    const sequelizeService = new SequelizeService();
    const linkService = new LinkService(sequelizeService);

    await linkService.generateShortLink(params).then((result: any) => {
        debug('STATUS RESPONSE POST: %d', result);
        return res.redirect('/');
    }).catch((error: any) => {
        console.error(error);
        response = { status: 500, error: error.message };
        return res.status(500).send(response);
    });
});

linksController.get('/:shortlink', async (req: Request, res: Response) => {
    const params = {
        short_link: req.params.shortlink
    } as IRequest;
    let response: any;
    const sequelizeService = new SequelizeService();
    const linkService = new LinkService(sequelizeService);
    
    await linkService.getOriginalLink(params).then((result: any) => {
        debug('STATUS RESPONSE GET short link: %d', result);
        if (result) {
            return res.status(308).redirect(result.originalLink);
        } else {
            return res.status(404).send(`Cannot GET /${params.short_link}`);
        }
    }).catch((error: any) => {
        console.error(error);
        response = { status: 500, error: error.message };
        return res.status(500).send(response);
    });
});

linksController.get('/', async (req: Request, res: Response) => {
    let response: any;
    const sequelizeService = new SequelizeService();
    const linkService = new LinkService(sequelizeService);
    
    await linkService.getLinks().then(result => {
        debug('STATUS RESPONSE GET links: %j', result);
        return res.render('index', { data: result });
    }).catch((error) => {
        console.error(error);
        response = { status: 500, error: error.message };
        return res.status(500).send(response);
    });
});

linksController.post('/V1/Utilities/DeleteShortlink', async (req: Request, res: Response) => {
    let response: any;
    const params = {
        short_link: req.body.shortlink
    } as IRequest;
    const sequelizeService = new SequelizeService();
    const linkService = new LinkService(sequelizeService);
    
    await linkService.deleteLink(params).then(result => {
        debug('STATUS RESPONSE DELETE links: %d', result);
        return res.redirect('/');
    }).catch((error) => {
        console.error(error);
        response = { status: 500, error: error.message };
        return res.status(500).send(response);
    });
});

export default linksController;
