import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'links' })
export class LinkModel extends Model<LinkModel> {
    
    @PrimaryKey
    @Column({ field: 'uuid' })
    public uuid: string;
    
    @Column({ field: 'created_at' })
    public createdAt: string;

    @Column({ field: 'original_link' })
    public originalLink: string;
     
    @Column({ field: 'short_link' })
    public shortLink: string;
   
    @Column({ field: 'clicks' })
    public clicks: string;
}
