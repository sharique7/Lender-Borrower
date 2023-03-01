import { Router } from "express";
import { getUser, createUser } from "../controllers/usersControllers";
import { getLenderLoanAmount, getLenderLoanCount, createContracts } from "../controllers/contractsControllers";

const router = Router();

router.get("/users", getUser);
router.post("/users", createUser);
router.get("/lender-loan-amount/:n", getLenderLoanAmount);
router.get("/lender-loan-count/:n", getLenderLoanCount);
router.post("/contracts", createContracts);

export default router;