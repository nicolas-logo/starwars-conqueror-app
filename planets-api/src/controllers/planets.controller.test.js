const planetsCtrl = require('../controllers/planets.controller');
const Planet = require('../models/Planet');

jest.mock('../models/Planet');

describe('Planets Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetPlanet', () => {
    it('returns the planet when it exists', async () => {
      const mockPlanet = { name: 'Earth', last_modified_by: 'User' };
      Planet.findOne.mockResolvedValue(mockPlanet);

      const req = { params: { name: 'Earth' } };
      const res = { json: jest.fn() };

      await planetsCtrl.GetPlanet(req, res);

      expect(Planet.findOne).toHaveBeenCalledWith({ name: 'EARTH' });
      expect(res.json).toHaveBeenCalledWith(mockPlanet);
    });

    it('returns a 404 response when the planet does not exist', async () => {
      Planet.findOne.mockResolvedValue(null);

      const req = { params: { name: 'NonExistentPlanet' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await planetsCtrl.GetPlanet(req, res);

      expect(Planet.findOne).toHaveBeenCalledWith({ name: 'NONEXISTENTPLANET' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Planet not found' });
    });
  });

  describe('UpdatePlanet', () => {
    it('creates a new planet when it does not exist', async () => {
      const req = { body: { name: 'NewPlanet', last_modified_by: 'User' } };
      const res = { json: jest.fn() };

      await planetsCtrl.UpdatePlanet(req, res);

      expect(Planet.findOne).toHaveBeenCalledWith({ name: 'NEWPLANET' });
      expect(Planet).toHaveBeenCalledWith({ name: 'NEWPLANET', last_modified_by: 'USER' });
      expect(Planet.prototype.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    it('returns a 500 response on internal server error', async () => {
      Planet.findOne.mockRejectedValue(new Error('Internal Server Error'));

      const req = { body: { name: 'ErrorPlanet', last_modified_by: 'User' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await planetsCtrl.UpdatePlanet(req, res);

      expect(Planet.findOne).toHaveBeenCalledWith({ name: 'ERRORPLANET' });
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
