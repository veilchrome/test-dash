import React from 'react';

import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
