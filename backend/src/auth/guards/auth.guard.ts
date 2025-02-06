// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { ROLES_KEY } from '../decorator/roles.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private reflector: Reflector,
//   ) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();

//     console.log('Request Headers:', request.headers);

//     // 1. Check if Authorization header exists
//     const authHeader = request.headers['authorization'];
//     if (!authHeader) {
//       throw new UnauthorizedException('Missing Authorization header');
//     }

// console.log('Authorisation Header:', authHeader);

//     // 2. Split into "Bearer" and <token>
//     const [bearer, token] = authHeader.split(' ');
//     if (bearer.toLowerCase() !== 'bearer' || !token) {
//       throw new UnauthorizedException('Invalid token format!');
//     }
//     console.log(authHeader)

//     // 3. Verify token
//     let payload: any;
//     try {
//       payload = this.jwtService.verify(token);
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired token:(');
//     }

//     // 4. Attach user info to request (for controllers/decorators)
//     request.user = { id: payload.id, role: payload.role };

//     // 5. Check roles (if any are required)
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!requiredRoles || requiredRoles.length === 0) {
//       // No role restrictions, so this route is allowed
//       return true;
//     }

//     // 6. Ensure user's role is in the allowed roles
//     const userRole = payload.role;
//     const hasRole = requiredRoles.includes(userRole);

//     if (!hasRole) {
//       throw new ForbiddenException(`Requires one of roles: [${requiredRoles.join(', ')}]`);
//     }

//     return true;
//   }
// }
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format!');
    }

    const token = authHeader.split(' ')[1]; // Extract token
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Attach user to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
