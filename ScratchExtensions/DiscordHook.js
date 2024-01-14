// Name: Discord Hook
// ID: discordhook
// Description: Sends messages through Discord webhooks!
// Note: This was built off of CubesterYT's TurboHook extension.
// By: RBryanYT [https://scratch.mit.edu/users/a_Gameer0438791]

(function(Scratch) {
  const vm = Scratch.vm;

  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("DiscordHook must run unsandboxed!");
  }

  const parseOrEmptyObject = (str) => {
    try {
      const obj = JSON.parse(str);
      if (obj && typeof obj === "object") return obj;
    } catch (e) {
      return {};
    }
  };

  class DiscordHook {
    getInfo() {
      return {
        id: 'discordhook',
        name: "Discord Hook",
        color1: "#5865f2",
        color2: "#4f5bd9",
        color3: "#4751c2",
        blocks: [
          {
            opcode: 'sendmessage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send message [CONTENT] to webhook url [WEBHOOKURL]',
            arguments: {
              CONTENT: {
                type: Scratch.ArgumentType.REPORTER
              },
              WEBHOOKURL: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'contentblock',
            blockType: Scratch.BlockType.REPORTER,
            text: '[TYPE] [VALUE]',
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CONTENT_TYPE'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'contentjoin',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] , [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.REPORTER
              },
              B: {
                type: Scratch.ArgumentType.REPORTER
              }
            }
          },
          {
            opcode: 'makeembed',
            blockType: Scratch.BlockType.REPORTER,
            text: 'make basic embed with title [TITLE], description [DESC], color [COLOR]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING
              },
              DESC: {
                type: Scratch.ArgumentType.STRING
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000"
              }
            }
          },
          {
            opcode: 'makeadvancedembed',
            blockType: Scratch.BlockType.REPORTER,
            text: 'make advanced embed with title [TITLE], description [DESC], color [COLOR], author [AUTHOR], image [IMAGE], thumbnail [THUMB]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING
              },
              DESC: {
                type: Scratch.ArgumentType.STRING
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000"
              },
              AUTHOR: {
                type: Scratch.ArgumentType.STRING
              },
              IMAGE: {
                type: Scratch.ArgumentType.STRING
              },
              THUMB: {
                type: Scratch.ArgumentType.STRING
              }
            }
          }
        ],
        menus: {
          CONTENT_TYPE: {
            acceptReporters: false,
            items: [
              {
                text: 'message',
                value: 'message'
              },
              {
                text: 'basic embed',
                value: 'basic embed'
              },
              {
                text: 'advanced embed',
                value: 'advanced embed'
              },
              {
                text: 'username',
                value: 'username'
              },
              {
                text: 'thread name',
                value: 'thread name'
              },
              {
                text: 'avatar url',
                value: 'avatar url'
              }
            ]
          }
        },
      };
    }
  
    sendmessage({ CONTENT, WEBHOOKURL }) {
      const data = parseOrEmptyObject(CONTENT);
      if (!data.content) {
        data.content = "(empty)";
      }
      Scratch.fetch(WEBHOOKURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    contentblock({ TYPE, VALUE }) {
      const data = Scratch.Cast.toString(VALUE);
      if (TYPE == "message") {
        return JSON.stringify({ content: data });
      } else if (TYPE == "username") {
        return JSON.stringify({ username: data });
      } else if (TYPE == "avatar url") {
        return JSON.stringify({ avatar_url: data });
      } else if (TYPE == "thread name") {
        return JSON.stringify({ thread_name: data });
      } else if (TYPE == "basic embed") {
        return JSON.stringify({embeds: [{ title: JSON.parse(data).title, description: JSON.parse(data).description, color: JSON.parse(data).color }]});
      } else if (TYPE == "advanced embed") {
        return JSON.stringify({embeds: [{ title: JSON.parse(data).title, description: JSON.parse(data).description, color: JSON.parse(data).color, author: { name: JSON.parse(data).author }, image: { url: JSON.parse(data).image }, thumbnail: { url: JSON.parse(data).thumbnail }}]});
      }
      return "{}";
    }
    contentjoin({ A, B }) {
      return JSON.stringify({
        ...parseOrEmptyObject(A),
        ...parseOrEmptyObject(B),
      });
    }
    makeembed({ TITLE, DESC, COLOR }) {
      const titlevar = Scratch.Cast.toString(TITLE);
      const descvar = Scratch.Cast.toString(DESC);
      const colorvar = Scratch.Cast.toString(COLOR);
      return JSON.stringify({ title: titlevar, description: descvar, color: parseInt(colorvar.replace("#", ""), 16) })
    }
    makeadvancedembed({ TITLE, DESC, COLOR, AUTHOR, IMAGE, THUMB }) {
      const titlevar = Scratch.Cast.toString(TITLE);
      const descvar = Scratch.Cast.toString(DESC);
      const colorvar = Scratch.Cast.toString(COLOR);
      const authorvar = Scratch.Cast.toString(AUTHOR);
      const imagevar = Scratch.Cast.toString(IMAGE);
      const thumbvar = Scratch.Cast.toString(THUMB);
      return JSON.stringify({ title: titlevar, description: descvar, color: parseInt(colorvar.replace("#", ""), 16), author: authorvar, image: imagevar, thumbnail: thumbvar })
    }
  }
  Scratch.extensions.register(new DiscordHook());
})(Scratch);