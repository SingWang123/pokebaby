"use client";
import React, { PropsWithChildren } from 'react';
import '../styles/globals.css';
import "../styles/signin.css" ;
import { ParameterProvider } from '@context/ParameterContext'; // 確保路徑正確
import { AuthProvider } from '@context/AuthContext';
import { BackpackProvider } from '@context/BackpackContext';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  return (
    <ParameterProvider>
      <AuthProvider>
        <BackpackProvider>
          <html lang="en">
          <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Project Pokebaby</title>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.0/lottie.min.js" type="text/javascript"></script>
          </head>
          <body>
              <main>{children}</main>
          </body>
          </html>
        </BackpackProvider>
      </AuthProvider>
    </ParameterProvider>
  );
};

export default Layout;