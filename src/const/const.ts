import {LibSQLStore} from "@mastra/libsql";
import {Memory} from "@mastra/memory";
import {LibSQLVector} from "@mastra/core/vector/libsql";
import {fastembed} from '@mastra/fastembed';


export const memory =
    new Memory({
      storage: new LibSQLStore({
        url: "file:/Users/souhei.etou/sandbox/4keys-mastra/memory.db",
      }),
      vector: new LibSQLVector({
        connectionUrl: "file:/Users/souhei.etou/sandbox/4keys-mastra/memory.db"
      }),
      options: {
        lastMessages: 40,
        semanticRecall: {
          topK: 2,
          messageRange: {
            before: 2,
            after: 2
          }
        },
        threads: {
          generateTitle: true
        }
      },
      embedder: fastembed
    })


