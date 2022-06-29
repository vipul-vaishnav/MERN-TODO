import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardMain = () => {
  const { project } = useSelector((state) => state.project);

  return (
    <div className="w-full h-full px-4 py-2 overflow-auto">
      <div className="mb-4 text-sm sm:mb-2 breadcrumbs">
        <ul>
          <li>
            <Link to="/view-projects">All Projects</Link>
          </li>
          <li>
            <Link to={`/dashboard/${project._id}`}>{project.title}</Link>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
      <h1 className="text-2xl font-semibold">Kanban Board</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iusto blanditiis nihil, exercitationem
        nulla molestiae distinctio ipsam quo harum deleniti nostrum fugit ratione iste odio ullam necessitatibus optio
        error quam pariatur explicabo illum expedita. Consectetur nulla eligendi, facilis exercitationem fugiat
        provident eum esse alias, suscipit consequuntur modi illum, odit dignissimos possimus veritatis dolore! Ex, ipsa
        placeat iusto, sapiente cumque reprehenderit nam mollitia quis nostrum odio nisi ratione facilis distinctio
        dolorem ad quae modi voluptatem! Veniam nisi tenetur, odit facilis ea adipisci facere vero nam. Dolorum esse
        repellendus dolorem fugiat incidunt enim, consequuntur ea pariatur illo, illum eius facilis mollitia ipsum.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero nostrum neque deserunt quia deleniti ea error
        veniam maiores veritatis quaerat illo, praesentium, repellat tenetur vel provident! A eligendi reprehenderit
        veritatis voluptatem? Molestias mollitia perferendis ducimus ipsa? Quidem eum atque ut voluptates ad, eveniet,
        autem cumque officiis molestias incidunt inventore. Nesciunt quia aliquid eum vitae, esse sequi? Quis
        perspiciatis, quia accusamus unde iusto aut porro mollitia libero blanditiis officiis repellendus fugit quisquam
        assumenda suscipit, vitae quo odio consequatur hic rerum veritatis officia possimus reprehenderit commodi! Odio,
        aliquid esse! Qui eligendi reprehenderit quasi commodi est voluptate aliquid reiciendis totam, maiores ex autem
        veniam, nulla natus dicta in eos quod fuga quos recusandae quam vero voluptas dolor! Inventore nobis repellat
        enim sit at, magnam adipisci a quos id veniam fuga voluptas. Consequatur suscipit iste modi, impedit, pariatur
        voluptate asperiores cum natus, incidunt similique libero? Aspernatur fugit natus alias similique, hic ratione
        veniam iure quibusdam nihil perferendis, ipsa dolorem mollitia rerum eligendi consectetur quia optio
        reprehenderit harum autem accusamus sed excepturi. Delectus id ad aperiam rerum perspiciatis veritatis quia,
        aspernatur eligendi quam, molestiae est? Repellat excepturi fuga impedit error quia distinctio blanditiis nulla
        sapiente nihil eius! Voluptate quaerat ex eius dolores reprehenderit asperiores quibusdam.
      </p>
      <button className="btn btn-block">Button</button>
    </div>
  );
};

export default DashboardMain;
