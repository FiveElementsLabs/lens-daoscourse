import { create } from 'ipfs-http-client';
import { v4 as uuidv4 } from 'uuid';
import { LENS_PUBLICATION_METADATA_VERSION, APP_ID } from './ConfigVars';

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export const uploadIpfs = async postMetaData => {
  const { description, content, external_url, image, imageMimeType, name, media, attributes } = postMetaData;

  const result = await client.add(
    JSON.stringify({
      version: LENS_PUBLICATION_METADATA_VERSION || '1.0.0',
      metadata_id: uuidv4(),
      description,
      content,
      external_url,
      image,
      imageMimeType,
      name,
      attributes,
      media,
      // media: [
      //    {
      //      item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
      //      // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
      //      type: 'image/jpeg',
      //    },
      // ],
      appId: APP_ID,
    })
  );

  console.log('upload result ipfs', result);
  return result;
};
