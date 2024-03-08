const screenshot = require('../screenshot'); 
const loggerService = require('../../../utils/loggerService');
jest.mock('./../../../utils/loggerService'); 
describe('Test for TakeScreenshot function', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should take a screenshot successfully', async () => {
    const mockScreenshotData = 'test to take a screenshot';
    const mockDriver = {
      takeScreenshot: jest.fn().mockResolvedValue(mockScreenshotData),
    };

    const result = await screenshot(mockDriver);
    expect(result).toBeInstanceOf(Buffer);
    expect(loggerService.info).toHaveBeenCalledWith('Taking Screenshot');
  });

  it('should handle an error when taking a screenshot', async () => {
    const errorMessage = 'screenshot error';
    const mockDriver = {
      takeScreenshot: jest.fn().mockRejectedValue(new Error(errorMessage)),
    };
    await expect(screenshot(mockDriver)).rejects.toThrowError(errorMessage);
    expect(loggerService.info).toHaveBeenCalledWith('Taking Screenshot');
  });
});
