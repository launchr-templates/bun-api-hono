import { serve, type Server, type ServeOptions } from "bun";

type ServerOptions = {
  port?: number;
  silent?: boolean;
} & Partial<Omit<ServeOptions, "port">>;

/**
 * Creates a server that automatically finds an available port
 * @param options Server options with optional port (defaults to PORT env or 3000)
 * @returns Server instance running on an available port
 */
export const createServer = (options: ServerOptions = {}): Server => {
  const initialPort = options.port ?? Number(process.env.PORT || 3000);
  const { silent, ...serverConfig } = options;

  const tryPort = (port: number): Server => {
    try {
      return serve({
        ...(serverConfig as Omit<ServeOptions, "port">),
        port,
      });
    } catch (error: any) {
      if (error.code === "EADDRINUSE") {
        if (!silent) {
          console.log(`Port ${port} in use, trying ${port + 1}...`);
        }
        return tryPort(port + 1);
      }
      throw error;
    }
  };

  return tryPort(initialPort);
};
