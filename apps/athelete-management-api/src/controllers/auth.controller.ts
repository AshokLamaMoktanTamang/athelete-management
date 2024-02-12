import { HttpStatusCode } from 'axios';
import { NextFunction, Response, Request } from 'express';

import { CustomError, generateAccessToken, sendResponse } from '@/helpers';
import { createEvent, createUser, getUserByEmail } from '@/services';
import { ResponseMessage, UserRole } from '@/utils';
import { AccesstokenPayload, LoginResponse } from '@/dto';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const isExistingEmail = await getUserByEmail(email);

    if (isExistingEmail)
      throw new CustomError(ResponseMessage.EMAIL_TAKEN, 409);

    const newUser = await createUser(req.body);
    await createEvent({ event: 'SIGN_UP', user: newUser._id });

    sendResponse({
      isSuccess: true,
      message: ResponseMessage.USER_CREATED,
      res,
      status: HttpStatusCode.Created,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    const isPasswordValid = user && (await user.comparePassword(password));

    if (!user || !isPasswordValid)
      throw new CustomError(ResponseMessage.INVALID_CREDENTIALS, 401);

    await createEvent({ event: 'LOGIN', user: user._id });

    const tokenPayload: AccesstokenPayload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as keyof typeof UserRole,
      country: user.country,
      interestedSports: user.interestedSports,
    };

    const accessToken = generateAccessToken(tokenPayload);

    sendResponse<LoginResponse>({
      isSuccess: true,
      message: ResponseMessage.USER_LOGGED_IN,
      res,
      status: HttpStatusCode.Accepted,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
