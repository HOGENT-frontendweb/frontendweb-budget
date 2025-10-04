import { faker } from '@faker-js/faker';
import { Link, Outlet } from 'react-router';

const About = () => (
  <div>
    <h1>Over ons</h1>
    <div>
      <p className="mb-4">{faker.lorem.paragraph(10)}</p>
      <p>{faker.lorem.paragraph(10)}</p>
    </div>
    <ul  className="p-4 mb-4">
      <li>
        <Link to='/about/services' className="text-blue-600 underline">Onze diensten</Link>
      </li>
      <li>
        <Link to='/about/history' className="text-blue-600 underline">Geschiedenis</Link>
      </li>
      <li>
        <Link to='/about/location' className="text-blue-600 underline">Locatie</Link>
      </li>
    </ul>
    <Outlet />
  </div>
);

export default About;

export const Services = () => (
  <div>
    <h1>Onze diensten</h1>
    <p>{faker.lorem.paragraph(10)}</p>
  </div>
);

export const History = () => (
  <div>
    <h1>Geschiedenis</h1>
    <p>{faker.lorem.paragraph(10)}</p>
  </div>
);

export const Location = () => (
  <div>
    <h1>Locatie</h1>
    <p>{faker.lorem.paragraph(10)}</p>
  </div>
);
