import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll();
    return res.json({
      deliveryman,
    });
  }

  async show(req, res) {
    const { user_id } = req.headers;

    const spots = await Deliveryman.find({ user: user_id });

    return res.json(spots);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, avatar_id, email } = await Deliveryman.create(req.body);
    return res.json({
      id,
      name,
      avatar_id,
      email,
    });
  }

  async update(req, res) {
    const { index } = req.params;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(index);

    if (!deliveryman) {
      return res.status(400).json({ error: 'User not exists.' });
    }

    const { id, name, avatar_id, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      avatar_id,
      email,
    });
  }

  async delete(req, res) {
    const { index } = req.params;
    await Deliveryman.delete(index);

    return res.json({ success: 'User removed' });
  }
}

export default new DeliverymanController();
