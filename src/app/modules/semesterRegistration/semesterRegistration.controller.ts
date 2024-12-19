import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'semester registration successful',
    data: result,
  });
});

const getSemesterRegistrationById = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getSemesterRegistrationFromDB(req.params);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'get all semester registration successfully',
    data: result,
  });
});

const getSingleRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'get semester registration successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const semesterRegisterData = req.body;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationFromDB(
      id,
      semesterRegisterData,
    );
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'semester registration updated successfully',
        data: result,
      });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSemesterRegistrationById,
  getSingleRegistration,
  updateSemesterRegistration,
};
