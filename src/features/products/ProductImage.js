import React from 'react';
import { Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL_IMG_PRD } from '../../services/config';

const ProductImage = ({ products }) => {
  const mainImageUrl = products?.product_images?.[0]?.image_url;
  console.log('mainImageUrl: ', mainImageUrl);

  return (
    <div className="flex">
      <div className="mb-2">
        {products?.product_picture == null ? (
          mainImageUrl ? (
            <Tooltip title={<img src={`${BASE_URL_IMG_PRD}${mainImageUrl}`} alt="Additional" style={{ maxWidth: '150px', maxHeight: '150px' }} />}>
                                                
                                                <img src={`${BASE_URL_IMG_PRD}${mainImageUrl}`} alt="Product" className="w-20 h-60 object-cover" />
                                                    </Tooltip>
            
          ) : (
            <Avatar icon={<UserOutlined />} size={80} style={{ backgroundColor: '#87d068' }} />
          )
        ) : (
          <Tooltip title={<img src={`${BASE_URL_IMG_PRD}${products?.product_picture}`} alt="Additional" style={{ maxWidth: '150px', maxHeight: '150px' }} />}>
                                                
            <img src={`${BASE_URL_IMG_PRD}${products?.product_picture}`} alt="Product" className="w-20 h-20 object-cover" />
                                                    </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
