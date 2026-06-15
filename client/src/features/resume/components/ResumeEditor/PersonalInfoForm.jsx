import { User } from 'lucide-react'
import Input from '../../../../components/ui/Input'

/**
 * PersonalInfoForm — handles name, title, email, phone, linkedin.
 * Migrated from v1 PersonalInfoForm, now uses shared Input primitive.
 */
const PersonalInfoForm = ({ data, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-4">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
        <User className="h-4 w-4 text-brand-600" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Personal Info</h3>
    </div>

    <Input
      label="Full Name"
      name="name"
      value={data.name}
      onChange={onChange}
      placeholder="Jane Doe"
    />
    <Input
      label="Professional Title"
      name="title"
      value={data.title}
      onChange={onChange}
      placeholder="Senior Product Designer"
    />
    <Input
      label="Email"
      type="email"
      name="email"
      value={data.email}
      onChange={onChange}
      placeholder="jane@example.com"
    />
    <Input
      label="Phone"
      name="phone"
      value={data.phone}
      onChange={onChange}
      placeholder="+91 99999 99999"
    />
    <Input
      label="LinkedIn URL"
      name="linkedin"
      value={data.linkedin}
      onChange={onChange}
      placeholder="linkedin.com/in/janedoe"
    />
  </div>
)

export default PersonalInfoForm
