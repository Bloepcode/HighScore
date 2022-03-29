import { PrismaClient } from "@prisma/client";

import SportAlreadyExists from "./errors/SportAlreadyExists";
import UserAlreadyExists from "./errors/UserAlreadyExists";
import SportDoesNotExist from "./errors/SportDoesNotExist";
import UserDoesNotExist from "./errors/UserDoesNotExist";

interface scoreUserI {
  score: number;
  username: string;
}

interface scoreSportI {
  score: number;
  sportname: string;
}

class Database {
  private static prisma = new PrismaClient();

  static async disconnect() {
    Database.prisma.$disconnect();
  }

  // Add user
  static async addUser(username: string): Promise<boolean> {
    const usernames = await Database.prisma.user.count({
      where: {
        name: username,
      },
    });
    if (usernames > 0) {
      throw new UserAlreadyExists(username);
    }
    await Database.prisma.user.create({
      data: {
        name: username,
      },
    });
    return true;
  }

  // Remove a user
  static async removeUser(username: string): Promise<boolean> {
    await Database.prisma.score.deleteMany({
      where: {
        user: {
          name: username,
        },
      },
    });

    const user = await Database.prisma.user.findFirst({
      where: {
        name: username,
      },
    });
    if (!user) {
      throw new UserDoesNotExist(username);
    }

    await Database.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return true;
  }

  // Add sport
  static async addSport(sportName: string): Promise<boolean> {
    const sports = await Database.prisma.sport.count({
      where: {
        name: sportName,
      },
    });
    if (sports > 0) {
      throw new SportAlreadyExists(sportName);
    }
    await Database.prisma.sport.create({
      data: {
        name: sportName,
      },
    });
    return true;
  }

  // Remove sport
  static async removeSport(sportName: string): Promise<boolean> {
    await Database.prisma.score.deleteMany({
      where: {
        sport: {
          name: sportName,
        },
      },
    });

    const sport = await Database.prisma.sport.findFirst({
      where: {
        name: sportName,
      },
    });
    if (!sport) {
      throw new SportDoesNotExist(sportName);
    }

    await Database.prisma.sport.delete({
      where: {
        id: sport.id,
      },
    });
    return true;
  }

  // Get sports
  static async getSports() {
    return await Database.prisma.sport.findMany({ select: { name: true } });
  }

  // Get users
  static async getUsers() {
    return await Database.prisma.user.findMany({ select: { name: true } });
  }

  static async getUserHighScore(username: string) {
    const sport = await Database.prisma.user.findFirst({
      where: {
        name: username,
      },
    });
    if (!sport) {
      throw new UserDoesNotExist(username);
    }
    const scores = await Database.prisma.score.findMany({
      where: {
        user: {
          name: username,
        },
      },
      select: {
        score: true,
        sport: true,
      },
      orderBy: {
        score: "desc",
      },
    });
    const returnScores: scoreSportI[] = [];

    scores.forEach((score) => {
      returnScores.push({ score: score.score, sportname: score.sport.name });
    });
    return returnScores;
  }

  // Get sport scores
  static async getSportHighScores(sportName: string) {
    const sport = await Database.prisma.sport.findFirst({
      where: {
        name: sportName,
      },
    });
    if (!sport) {
      throw new SportDoesNotExist(sportName);
    }

    const scores = await Database.prisma.score.findMany({
      where: {
        sportId: sport.id,
      },
      orderBy: {
        score: "desc",
      },
      select: {
        user: true,
        score: true,
      },
    });

    const returnScores: scoreUserI[] = [];

    scores.forEach((score) => {
      returnScores.push({ score: score.score, username: score.user.name });
    });
    return returnScores;
  }

  // Set sport high score of user
  static async setSportScoreOfUser(
    sportName: string,
    username: string,
    highscore: number
  ): Promise<boolean> {
    const user = await Database.prisma.user.findFirst({
      where: {
        name: username,
      },
    });
    if (!user) {
      throw new UserDoesNotExist(username);
    }
    const sport = await Database.prisma.sport.findFirst({
      where: {
        name: sportName,
      },
    });
    if (!sport) {
      throw new SportDoesNotExist(sportName);
    }
    const score = await Database.prisma.score.findFirst({
      where: {
        user: {
          name: username,
        },
        sport: {
          name: sportName,
        },
      },
    });
    if (score) {
      await Database.prisma.score.update({
        where: {
          id: score.id,
        },
        data: {
          score: highscore,
        },
      });
    } else {
      await Database.prisma.score.create({
        data: {
          score: highscore,
          userId: user.id,
          sportId: sport.id,
        },
      });
    }
    return true;
  }
}

export default Database;
