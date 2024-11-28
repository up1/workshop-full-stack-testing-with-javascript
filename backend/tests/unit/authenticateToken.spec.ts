import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import authenticateToken from '../../src/authenticateToken'; // Update with the actual path

// Mock the jsonwebtoken module
vi.mock('jsonwebtoken');

describe('authenticateToken', () => {
  let req, res, next;

  // Reset the mocks before each test
  beforeEach(() => {
    // Mock the request object
    req = {
      headers: {},
    };
    // Mock the response object
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    // Mock the next function
    next = vi.fn();
  });

  it('should call next and attach user to req if token is valid', () => {
    const mockUser = { id: 1, name: 'Test User' };
    req.headers['authorization'] = 'Bearer validtoken';

    // Mock the jwt.verify function to return the user
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    authenticateToken(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', () => {
    req.headers['authorization'] = null;

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: 'unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token verification fails', () => {
    req.headers['authorization'] = 'Bearer invalidtoken';

    // Mock the jwt.verify function to return an error
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({ error: 'forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
