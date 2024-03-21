/*
Logger class for easy and aesthetically pleasing console logging 
*/
const { red, magenta, gray, yellow, white, green } = require("colorette");
//const { Timestamp } = require("@sapphire/time-utilities");
const moment = require("moment");
const { WebhookClient} = require("discord.js");
const config = require("./../config.js");

exports.log = (content, type = "log") => {
  const logsRevealer = new WebhookClient({ id: config.logshook[0], token: config.logshook[1] });
  const timestamp = ` ${moment().format("DD/MM/YYYY")} | ${moment().format("HH:mm:ss (Z)")}`;

  switch (type) {
    case "log": {
      console.log(`${timestamp} ${gray(type.toUpperCase())} ${content} `);
      return logsRevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nLOG:: " + content + "\n```");
    }
    case "warn": {
      console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
      return logsRevealer.send("BEGIN :warning: ```asciidoc\nTIMESTAMP::" + timestamp + "\nWARN:: " + content + "\n```END :warning:");
    }
    case "error": {
      console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `)
      return logsRevealer.send("BEGIN :sos: ```asciidoc\nTIMESTAMP::" + timestamp + " \nERROR:: " + content + "\n```END :sos:");
    }
    case "debug": {
      console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `)
      return logsRevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nDEBUG:: " + content + "\n```");
    }
    case "cmd": {
      console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
      return logsRevealer.send("```asciidoc\nTIMESTAMP::" + timestamp +"\nCOMMAND:: " + content + "\n```");
    }
    case "ready": {
      console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
      return logsRevealer.send("```asciidoc\nTIMESTAMP::" + timestamp + "\nREADY:: " + content + "\n```");
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
