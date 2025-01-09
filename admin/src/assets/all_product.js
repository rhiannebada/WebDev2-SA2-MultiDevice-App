import p2_img from './product1.png';
import p3_img from './product2.png';
import p4_img from './product3.png';
import p5_img from './product4.png';
import p6_img from './product5.png';
import p7_img from './product6.png';
import p8_img from './product7.png';
import p9_img from './product8.png';
import p10_img from './product9.png';
import p11_img from './product10.png';
import p12_img from './product11.png';
import p13_img from './product12.png';
import p14_img from './product13.png';
import p15_img from './product14.png';
import p16_img from './product15.png';
import p17_img from './product16.png';
import p18_img from './product17.png';
import p19_img from './product18.png';
import p20_img from './product19.png';
import p21_img from './product20.png';
import p22_img from './product21.png';
import p23_img from './product22.png';
import p24_img from './product23.png';
import p25_img from './product24.png';
import p26_img from './product25.png';
import p27_img from './product26.png';
import p28_img from './product27.png';
import p29_img from './product28.png';

let all_products = [
    {
        id: 2,
        name: 'Dark Moon Vol. 1',
        category: 'books',
        image: p2_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 3,
        name: 'Dark Moon Vol. 2',
        category: 'books',
        image: p3_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 4,
        name: 'Dark Moon Vol. 3',
        category: 'books',
        image: p4_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 5,
        name: 'Dark Moon Vol. 4',
        category: 'books',
        image: p5_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 6,
        name: 'Dark Moon Vol. 5',
        category: 'books',
        image: p6_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 7,
        name: 'Dark Moon Vol. 6',
        category: 'books',
        image: p7_img,
        new_price: 17.99,
        old_price: 24.99,
    },
    {
        id: 8,
        name: 'Dark Moon Special Package',
        category: 'books',
        image: p8_img,
        new_price: 113.98,
        old_price: 149.98,
    },
    {
        id: 9,
        name: 'Collection Book',
        category: 'merch',
        image: p9_img,
        new_price: 14.76,
        old_price: 21.99,
    },
    {
        id: 10,
        name: '2025 Calendar',
        category: 'merch',
        image: p10_img,
        new_price: 16.40,
        old_price: 24.99,
    },
    {
        id: 11,
        name: 'Tattoo Stickers',
        category: 'merch',
        image: p11_img,
        new_price: 5.74,
        old_price: 7.99,
    },
    {
        id: 12,
        name: 'Towel',
        category: 'merch',
        image: p12_img,
        new_price: 8.20,
        old_price: 12.99,
    },
    {
        id: 13,
        name: 'Earring',
        category: 'merch',
        image: p13_img,
        new_price: 15.58,
        old_price: 21.99,
    },
    {
        id: 14,
        name: 'Slogan',
        category: 'merch',
        image: p14_img,
        new_price: 16.40,
        old_price: 24.99,
    },
    {
        id: 15,
        name: 'L-Holder',
        category: 'merch',
        image: p15_img,
        new_price: 2.46,
        old_price: 3.99,
    },
    {
        id: 16,
        name: 'Cross Bag',
        category: 'merch',
        image: p16_img,
        new_price: 21.32,
        old_price: 32.99,
    },
    {
        id: 17,
        name: 'Magnet Set',
        category: 'merch',
        image: p17_img,
        new_price: 4.92,
        old_price: 7.99,
    },
    {
        id: 18,
        name: 'Bookmark',
        category: 'merch',
        image: p18_img,
        new_price: 3.28,
        old_price: 5.99,
    },
    {
        id: 19,
        name: 'Plush Toy',
        category: 'merch',
        image: p19_img,
        new_price: 19.68,
        old_price: 31.99,
    },
    {
        id: 20,
        name: 'Thumbnail Stickers',
        category: 'merch',
        image: p20_img,
        new_price: 5.74,
        old_price: 6.56,
    },
    {
        id: 21,
        name: 'Cushion Keyring',
        category: 'merch',
        image: p21_img,
        new_price: 9.84,
        old_price: 15.99,
    },
    {
        id: 22,
        name: 'Photo Holder',
        category: 'merch',
        image: p22_img,
        new_price: 11.48,
        old_price: 14.99,
    },
    {
        id: 23,
        name: 'Cabinet Deco Set',
        category: 'merch',
        image: p23_img,
        new_price: 31.16,
        old_price: 37.99,
    },
    {
        id: 24,
        name: 'Webtoon Sticker (Blue)',
        category: 'merch',
        image: p24_img,
        new_price: 4.10,
        old_price: 5.99,
    },
    {
        id: 25,
        name: 'Webtoon Sticker (Beige)',
        category: 'merch',
        image: p25_img,
        new_price: 4.10,
        old_price: 5.99,
    },
    {
        id: 26,
        name: 'Dark Moon 1-4 Bundle',
        category: 'books',
        image: p26_img,
        new_price: 63.17,
        old_price: 79.99,
    },
    {
        id: 27,
        name: 'Memorabilia (Moon ver.)',
        category: 'albums',
        image: p27_img,
        new_price: 31.31,
        old_price: 40.99,
    },
    {
        id: 28,
        name: 'Memorabilia (Vargr ver.)',
        category: 'albums',
        image: p28_img,
        new_price: 28.87,
        old_price: 30.99,
    },
    {
        id: 29,
        name: 'Memorabilia Decelis Academy Kit',
        category: 'albums',
        image: p29_img,
        new_price: 84.45,
        old_price: 100.98,
    }
]

export default all_products;