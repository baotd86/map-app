/*
 * PostAddressPage
 *
 * List all the features
 */
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PostAddress from 'components/PostAddress';
import { MenuContext } from 'contexts/MenuContext';

function AddressPage() {
  const [isHome, setIsHome] = useContext(MenuContext);
  useEffect(() => {
    setIsHome(false);
  }, [setIsHome])
  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="post address"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <PostAddress />
    </div>
  );
}

export default AddressPage;
