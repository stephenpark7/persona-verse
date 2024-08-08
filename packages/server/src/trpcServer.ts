import { server } from './trpc';

const startTRPCServer = async () => {
  if (server.listen(3002)) {
    console.log('TRPC server started at port 3002');
  }
};

export { startTRPCServer };
