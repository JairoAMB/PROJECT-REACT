import apt1 from '../../assets/Img/img-apt/apt1.webp';
import thumb1 from '../../assets/Img/img-apt/thumb1.jpg';
import apt2 from '../../assets/Img/img-apt/apt2.webp';
import thumb2 from '../../assets/Img/img-apt/thumb2.jpg';
import apt3 from '../../assets/Img/img-apt/apt3.webp';
import thumb3 from '../../assets/Img/img-apt/thumb3.jpg';
import apt4 from '../../assets/Img/img-apt/apt4.webp';
import thumb4 from '../../assets/Img/img-apt/thumb4.jpg';
import apt5 from '../../assets/Img/img-apt/apt5.webp';
import thumb5 from '../../assets/Img/img-apt/thumb5.jpg';
export const PhotoService = {
    async getImages ()  {
        return [
            {
                itemImageSrc: apt1,
                thumbnailImageSrc: thumb1,
                alt: 'Imagen 1',
            },
            {
                itemImageSrc: apt2,
                thumbnailImageSrc: thumb2,
                alt: 'Imagen 2',
            },
            {
                itemImageSrc: apt3,
                thumbnailImageSrc: thumb3,
                alt: 'Imagen 3',
            },
            {
                itemImageSrc: apt4,
                thumbnailImageSrc: thumb4,
                alt: 'Imagen 4',
            },
            {
                itemImageSrc: apt5,
                thumbnailImageSrc: thumb5,
                alt: 'Imagen 5',
            },
        ];
    }
};