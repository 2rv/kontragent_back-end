"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ReferalMemberService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var referal_repository_1 = require("../referal/referal.repository");
var user_repository_1 = require("../user/user.repository");
var referal_member_repository_1 = require("./referal-member.repository");
var referal_member_enum_1 = require("./enum/referal-member-enum");
var user_role_enum_1 = require("../user/enum/user-role.enum");
var company_repository_1 = require("../company/company.repository");
var ReferalMemberService = /** @class */ (function () {
    function ReferalMemberService(userRepository, referalRepository, referalMemberRepository, companyRepository, mailService) {
        this.userRepository = userRepository;
        this.referalRepository = referalRepository;
        this.referalMemberRepository = referalMemberRepository;
        this.companyRepository = companyRepository;
        this.mailService = mailService;
    }
    ReferalMemberService.prototype.sendReferalMemberLink = function (user, sendReferalMemberLinkDto) {
        return __awaiter(this, void 0, Promise, function () {
            var invitedUser, invitedUserCompany, invitedUserCompanyIdList, commonCompany, referalMember, _a, referalQuery, referal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { email: sendReferalMemberLinkDto.email }
                        })];
                    case 1:
                        invitedUser = _b.sent();
                        //ПРОВЕРКА НA  ПРИГЛАШ. САМОГО СЕБЯ
                        if (invitedUser.id === user.id)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.CANNOT_ADD_YOURSELF_AS_REFERAL_MEMEBER);
                        //ПРОВЕРКА НА АДМИНА
                        if (invitedUser.role === user_role_enum_1.USER_ROLE.ADMIN)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.CANNOT_ADD_ROLE_ADMIN);
                        if (!invitedUser) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.companyRepository.getCompanyListByUser(invitedUser)];
                    case 2:
                        invitedUserCompany = _b.sent();
                        invitedUserCompanyIdList = invitedUserCompany.map(function (company) {
                            return company.id;
                        });
                        return [4 /*yield*/, this.companyRepository.createQueryBuilder('company')
                                .leftJoin('company.companyMember', 'companyMember')
                                .leftJoin('companyMember.user', 'user')
                                .where("company.id IN (:...ids)", { ids: invitedUserCompanyIdList })
                                .andWhere("user.id = :id", { id: user.id })
                                .getOne()];
                    case 3:
                        commonCompany = _b.sent();
                        if (commonCompany)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.USER_IS_MEMBER_OF_YOUR_COMPANY);
                        _b.label = 4;
                    case 4:
                        if (!invitedUser) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.referalMemberRepository.getReferalMemberByUser(invitedUser)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = false;
                        _b.label = 7;
                    case 7:
                        referalMember = _a;
                        if (referalMember)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.USER_ALREADY_REFERAL_MEMBER);
                        referalQuery = this.referalRepository.createQueryBuilder('referal');
                        referalQuery.leftJoinAndSelect('referal.user', 'user');
                        referalQuery.where('user.id = :id', { id: user.id });
                        return [4 /*yield*/, referalQuery.getOne()];
                    case 8:
                        referal = _b.sent();
                        invitedUser
                            ? this.mailService.sendReferralLinkEmailToRegisteredUser(sendReferalMemberLinkDto, referal)
                            : this.mailService.sendReferralLinkEmailToNotRegisteredUser(sendReferalMemberLinkDto, referal);
                        return [2 /*return*/];
                }
            });
        });
    };
    ReferalMemberService.prototype.getUserReferalMemberList = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.referalMemberRepository.getReferalMemberList(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReferalMemberService.prototype.createReferalMember = function (referal, user) {
        return __awaiter(this, void 0, Promise, function () {
            var query, referalUser, referalUserCompany, referalUserCompanyIdList, commonCompany, referalMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.userRepository
                            .createQueryBuilder('user')
                            .leftJoin('user.referal', 'referal')
                            .where('referal.id = :id', { id: referal.id });
                        return [4 /*yield*/, query.getOne()];
                    case 1:
                        referalUser = _a.sent();
                        //ПРОВЕРКА НA  ПРИГЛАШ. САМОГО СЕБЯ
                        if (referal.id === user.id)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.CANNOT_ADD_YOURSELF_AS_REFERAL_MEMEBER);
                        //ПРОВЕРКА НА АДМИНА
                        if (user.role === user_role_enum_1.USER_ROLE.ADMIN)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.CANNOT_ADD_ROLE_ADMIN);
                        return [4 /*yield*/, this.companyRepository.getCompanyListByUser(referalUser)];
                    case 2:
                        referalUserCompany = _a.sent();
                        referalUserCompanyIdList = referalUserCompany.map(function (company) {
                            return company.id;
                        });
                        return [4 /*yield*/, this.companyRepository.createQueryBuilder('company')
                                .leftJoin('company.companyMember', 'companyMember')
                                .leftJoin('companyMember.user', 'user')
                                .where("company.id IN (:...ids)", { ids: referalUserCompanyIdList })
                                .andWhere("user.id = :id", { id: user.id })
                                .getOne()];
                    case 3:
                        commonCompany = _a.sent();
                        if (commonCompany)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.USER_IS_MEMBER_OF_YOUR_COMPANY);
                        return [4 /*yield*/, this.referalMemberRepository.getReferalMemberByUser(user)];
                    case 4:
                        referalMember = _a.sent();
                        if (referalMember)
                            throw new common_1.BadRequestException(referal_member_enum_1.REFERAL_MEMBER_ERROR.USER_ALREADY_REFERAL_MEMBER);
                        return [4 /*yield*/, this.referalMemberRepository.createReferalMember(referal, user)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReferalMemberService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
        __param(1, typeorm_1.InjectRepository(referal_repository_1.ReferalRepository)),
        __param(2, typeorm_1.InjectRepository(referal_member_repository_1.ReferalMemberRepository)),
        __param(3, typeorm_1.InjectRepository(company_repository_1.CompanyRepository))
    ], ReferalMemberService);
    return ReferalMemberService;
}());
exports.ReferalMemberService = ReferalMemberService;
