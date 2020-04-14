import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const deliveryProblem = await DeliveryProblem.findAll();
    return res.json({
      deliveryProblem,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, delivery_id, description } = await DeliveryProblem.create(
      req.body
    );
    return res.json({
      id,
      delivery_id,
      description,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required().min(2),
      state: Yup.string().required().min(2),
      city: Yup.string().required().min(2),
      zip_code: Yup.string().required().min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryProblem = await DeliveryProblem.findByPk(
      req.deliveryProblemId
    );

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await deliveryProblem.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new DeliveryProblemController();
