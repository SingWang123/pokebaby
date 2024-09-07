"use client";
import React, { PropsWithChildren } from 'react';
import '../styles/globals.css';
import { ParameterProvider } from '@context/ParameterContext'; // 確保路徑正確
import { AuthProvider } from '@context/AuthContext';
import { BackpackProvider } from '@context/BackpackContext';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MessageProvider } from '@context/MessageContext';
import { MouseTransition, MultiBackend, TouchTransition } from 'dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 定義拖放行為的過渡條件
const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition, // PC上使用滑鼠的過渡條件
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,  // 支援滑鼠事件作為後備方案
        preview: true,            // 確保啟用預覽
      },
      transition: TouchTransition, // 手持設備上使用觸控的過渡條件
    },
  ],
};

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ParameterProvider>
        <AuthProvider>
          <BackpackProvider>
            <MessageProvider>
              <html lang="en">
              <head>
                  <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <title>Project Pokebaby</title>
                  <link rel = "icon" href = "/favicon.ico" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com"  />
                  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet" />
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.10.0/lottie.min.js" type="text/javascript"></script>
              </head>
              <body>
                  <main>{children}</main>
              </body>
              </html>
            </MessageProvider>
          </BackpackProvider>
        </AuthProvider>
      </ParameterProvider>
    </DndProvider>
  );
};

export default Layout;