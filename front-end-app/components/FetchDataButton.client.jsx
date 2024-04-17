'use client';
// components/Button.client.js
function Button({accessToken}) {

  const fetchPublicEndpoint = async () => {

    console.log('publicエンドポイントを叩く');
    const public_response = await fetch('http://localhost:8000/public');
    const public_json = await public_response.json();
    console.log('publicエンドポイントの戻り: ', public_json);

  }

  const fetchPrivateEndpoint = async () => {

    console.log('privateエンドポイントを叩く');
    // headerでアクセストークンを送らないとエラーになる。
    // const private_response = await fetch('http://localhost:8000/private');

    // headerでAuthorizationにトークンを設定するとレスポンスを受け取れる
    const private_response = await fetch('http://localhost:8000/private', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const private_json = await private_response.json();
    console.log('privateエンドポイントの戻り: ', private_json);

  }

  /**
   * read:orderスコープが必要なエンドポイントを叩く
   */
  const fetchNeedReadScopeEndpoint = async () => {

    console.log('ordersエンドポイントを叩く');

    // headerでAuthorizationにトークンを設定するとレスポンスを受け取れる
    const orders_response = await fetch('http://localhost:8000/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const orders_json = await orders_response.json();
    console.log('ordersエンドポイントの戻り: ', orders_json);

  }

  /**
   * create:orderスコープが必要なエンドポイントを叩く
   */
    const fetchNeedCreateScopeEndpoint = async () => {

      console.log('ordersエンドポイント(post)を叩く');
  
      // 現在はcreate:orderスコープは含まれていないので401になる
      const orders_response = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      const orders_json = await orders_response.json();
      console.log('ordersエンドポイント(post)の戻り: ', orders_json);
  
    }

  return (
    <>
      <button onClick={fetchPublicEndpoint}>publicエンドポイント</button>
      <button onClick={fetchPrivateEndpoint}>privateエンドポイント</button>
      <button onClick={fetchNeedReadScopeEndpoint}>ordersエンドポイント</button>
      <button onClick={fetchNeedCreateScopeEndpoint}>ordersエンドポイント(post)</button>
    </>
  );
}

export default Button;